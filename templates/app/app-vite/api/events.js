const EVENTBRITE_BASE_URL = "https://www.eventbriteapi.com/v3";

function parseDateAndTime(startLocal) {
  if (!startLocal || typeof startLocal !== "string") {
    return { date: "", time: "" };
  }

  const [datePart, timePart = ""] = startLocal.split("T");
  return {
    date: datePart || "",
    time: timePart.slice(0, 5),
  };
}

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeEvent(rawEvent) {
  const { date, time } = parseDateAndTime(rawEvent?.start?.local);

  const capacity = toNumber(rawEvent?.capacity);
  const remaining = toNumber(rawEvent?.ticket_availability?.remaining_quantity);
  const ticketsAvailable = remaining !== null ? Math.max(0, remaining) : 100;
  const totalTickets = capacity !== null ? capacity : ticketsAvailable;

  const price = rawEvent?.is_free ? 0 : 25;

  return {
    id: rawEvent?.id,
    name: rawEvent?.name?.text || "Untitled event",
    date,
    time,
    venue:
      rawEvent?.venue?.name ||
      (rawEvent?.online_event ? "Online" : "Venue TBA"),
    city:
      rawEvent?.venue?.address?.city ||
      rawEvent?.venue?.address?.localized_area_display ||
      "Unknown",
    description:
      rawEvent?.description?.text ||
      rawEvent?.summary ||
      "No description available.",
    price,
    ticketsAvailable,
    totalTickets,
    category: "Event",
    image: rawEvent?.logo?.url || null,
  };
}

function getToken() {
  return (
    process.env.EVENTBRITE_PRIVATE_TOKEN ||
    process.env.EVENTBRITE_API_KEY ||
    process.env.VITE_API_KEY
  );
}

async function eventbriteGet(path, token, queryParams = {}) {
  const params = new URLSearchParams(queryParams);
  const url = `${EVENTBRITE_BASE_URL}${path}${params.toString() ? `?${params.toString()}` : ""}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const text = await response.text();
  let body;

  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { error: text || "Invalid JSON from Eventbrite" };
  }

  return { response, body };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = getToken();
  if (!token) {
    return res.status(500).json({
      error:
        "Missing Eventbrite token. Set EVENTBRITE_PRIVATE_TOKEN in Vercel environment variables.",
    });
  }

  try {
    const eventId = req.query?.id;

    if (eventId) {
      const { response, body } = await eventbriteGet(
        `/events/${encodeURIComponent(String(eventId))}/`,
        token,
        { expand: "venue" },
      );

      if (!response.ok) {
        return res.status(response.status).json({
          error:
            body?.error_description || body?.error || "Failed to fetch event",
          details: body,
        });
      }

      return res.status(200).json(normalizeEvent(body));
    }

    const q = req.query?.q ? String(req.query.q).trim() : "";
    const page = Math.max(1, Number(req.query?._page || req.query?.page || 1));
    const limit = Math.min(
      50,
      Math.max(1, Number(req.query?._limit || req.query?.limit || 6)),
    );

    const { response, body } = await eventbriteGet("/events/search/", token, {
      expand: "venue",
      page: String(page),
      page_size: String(limit),
      ...(q ? { q } : {}),
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          body?.error_description || body?.error || "Failed to fetch events",
        details: body,
      });
    }

    const events = Array.isArray(body?.events)
      ? body.events.map(normalizeEvent)
      : [];

    const totalCount = Number(body?.pagination?.object_count || events.length);
    res.setHeader("X-Total-Count", String(totalCount));

    return res.status(200).json(events);
  } catch (error) {
    console.error("Error in /api/events:", error);
    return res.status(500).json({
      error: "Unexpected server error while fetching events",
      message: error?.message || "Unknown error",
    });
  }
}
