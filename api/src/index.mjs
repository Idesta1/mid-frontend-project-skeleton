import "dotenv/config";
import bcrypt from "bcryptjs";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import fs from "node:fs/promises";
import path from "node:path";
import knex from "./database_client.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();
const jwtSecret = process.env.JWT_SECRET || "change-this-secret-in-production";

apiRouter.get("/", (req, res) => {
  res.json({ status: "ok", service: "events-api" });
});

function serializeJson(value) {
  return JSON.stringify(value ?? null);
}

function parseJson(value, fallback) {
  if (value === null || value === undefined) return fallback;
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function publicUser(user) {
  return { id: user.id, email: user.email };
}

function issueToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  });
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token)
    return res.status(401).json({ message: "Authentication required" });

  try {
    req.user = jwt.verify(token, jwtSecret);
    next();
  } catch {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

function toEvent(row) {
  return row;
}

function toOrder(row) {
  return {
    id: row.id,
    userId: row.user_id,
    items: parseJson(row.items, []),
    total: Number(row.total),
    status: row.status,
    createdAt: row.created_at,
    email: row.email,
    customerName: row.customer_name,
    payment: parseJson(row.payment, null),
  };
}

async function initializeDatabase() {
  if (!(await knex.schema.hasTable("users"))) {
    await knex.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
    });
  }

  if (!(await knex.schema.hasTable("events"))) {
    await knex.schema.createTable("events", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("date").notNullable();
      table.string("time").notNullable();
      table.string("venue").notNullable();
      table.string("city").notNullable();
      table.text("description").notNullable();
      table.decimal("price", 10, 2).notNullable().defaultTo(0);
      table.integer("ticketsAvailable").notNullable();
      table.integer("totalTickets").notNullable();
      table.string("category").notNullable();
      table.string("image");
    });
  }

  if (!(await knex.schema.hasTable("orders"))) {
    await knex.schema.createTable("orders", (table) => {
      table.increments("id").primary();
      table.integer("user_id").notNullable().references("id").inTable("users");
      table.text("items").notNullable();
      table.decimal("total", 10, 2).notNullable();
      table.string("status").notNullable().defaultTo("pending");
      table.timestamp("created_at").notNullable();
      table.string("email");
      table.string("customer_name");
      table.text("payment");
    });
  }

  const eventCount = await knex("events").count({ count: "id" }).first();
  if (Number(eventCount?.count || 0) === 0) {
    const seedPath = path.resolve(
      process.cwd(),
      "../templates/app/app-vite/api/db.json",
    );
    const seedData = JSON.parse(await fs.readFile(seedPath, "utf8"));
    await knex("events").insert(seedData.events);
  }
}

apiRouter.post("/register", async (req, res, next) => {
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();
    const password = String(req.body.password || "");

    if (!email || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Email and a 6-character password are required" });
    }

    const existingUser = await knex("users").where({ email }).first();
    if (existingUser)
      return res.status(409).json({ message: "Email is already registered" });

    const [id] = await knex("users").insert({
      email,
      password: await bcrypt.hash(password, 10),
    });
    const user = await knex("users").where({ id }).first();
    return res
      .status(201)
      .json({ accessToken: issueToken(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

apiRouter.post("/login", async (req, res, next) => {
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();
    const user = await knex("users").where({ email }).first();
    const passwordMatches =
      user &&
      (await bcrypt.compare(String(req.body.password || ""), user.password));

    if (!passwordMatches)
      return res.status(401).json({ message: "Invalid email or password" });
    return res.json({ accessToken: issueToken(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/events", async (req, res, next) => {
  try {
    const search = String(req.query.q || "")
      .trim()
      .toLowerCase();
    const page = Math.max(1, Number(req.query._page || 1));
    const limit = Math.max(1, Math.min(100, Number(req.query._limit || 100)));
    const baseQuery = knex("events");

    if (search) {
      baseQuery.where((query) => {
        query
          .whereRaw("LOWER(name) LIKE ?", [`%${search}%`])
          .orWhereRaw("LOWER(category) LIKE ?", [`%${search}%`])
          .orWhereRaw("LOWER(city) LIKE ?", [`%${search}%`]);
      });
    }

    const countResult = await baseQuery.clone().count({ count: "id" }).first();
    const events = await baseQuery
      .clone()
      .orderBy("date", "asc")
      .orderBy("id", "asc")
      .offset((page - 1) * limit)
      .limit(limit);

    res.set("X-Total-Count", String(countResult?.count || 0));
    return res.json(events.map(toEvent));
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/events/:id", async (req, res, next) => {
  try {
    const event = await knex("events").where({ id: req.params.id }).first();
    if (!event) return res.status(404).json({ message: "Event not found" });
    return res.json(toEvent(event));
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/orders", requireAuth, async (req, res, next) => {
  try {
    const orders = await knex("orders")
      .where({ user_id: req.user.id })
      .orderBy("created_at", "desc");
    return res.json(orders.map(toOrder));
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/orders/:id", requireAuth, async (req, res, next) => {
  try {
    const order = await knex("orders")
      .where({ id: req.params.id, user_id: req.user.id })
      .first();
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.json(toOrder(order));
  } catch (error) {
    next(error);
  }
});

apiRouter.post("/orders", requireAuth, async (req, res, next) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (!items.length)
      return res.status(400).json({ message: "At least one item is required" });

    const order = await knex.transaction(async (transaction) => {
      const orderItems = [];
      let total = 0;

      for (const item of items) {
        const quantity = Math.max(1, Number(item.quantity || 1));
        const event = await transaction("events")
          .where({ id: item.id })
          .first();
        if (!event)
          throw Object.assign(new Error("Event not found"), { status: 404 });
        if (event.ticketsAvailable < quantity) {
          throw Object.assign(
            new Error(`Not enough tickets for ${event.name}`),
            { status: 409 },
          );
        }

        await transaction("events")
          .where({ id: event.id })
          .update({ ticketsAvailable: event.ticketsAvailable - quantity });
        const orderItem = { ...event, quantity };
        orderItems.push(orderItem);
        total += Number(event.price) * quantity;
      }

      const createdAt = new Date().toISOString();
      await transaction("orders").insert({
        user_id: req.user.id,
        items: serializeJson(orderItems),
        total,
        status: "pending",
        created_at: createdAt,
        email: req.body.email || req.user.email,
        customer_name: req.body.customerName || null,
        payment: serializeJson(req.body.payment),
      });

      return transaction("orders")
        .where({ user_id: req.user.id })
        .orderBy("id", "desc")
        .first();
    });

    return res.status(201).json(toOrder(order));
  } catch (error) {
    next(error);
  }
});

app.use("/api", apiRouter);

app.use((error, req, res, next) => {
  console.error(error);
  void req;
  void next;
  res
    .status(error.status || 500)
    .json({ message: error.message || "Internal server error" });
});

const port = process.env.PORT || 3001;
initializeDatabase()
  .then(() => {
    app.listen(port, () => console.log(`API listening on port ${port}`));
  })
  .catch((error) => {
    console.error("Could not initialize database", error);
    process.exit(1);
  });
