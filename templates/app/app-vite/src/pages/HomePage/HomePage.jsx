import eventHome from "../../assets/Event home.jpg";

const categories = [
  { id: "music", label: "Music" },
  { id: "art", label: "Visual Arts" },
  { id: "dating", label: "Dating" },
  { id: "holidays", label: "Holidays" },
  { id: "hobbies", label: "Hobbies" },
  { id: "food", label: "Food & Drink" },
  { id: "nightlife", label: "Nightlife" },
  { id: "workshop", label: "Workshops" },
];

function Icon({ id }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
  };
  switch (id) {
    case "music":
      return (
        <svg {...common}>
          <path
            d="M9 17V5l12-2v12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="6"
            cy="18"
            r="3"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "art":
      return (
        <svg {...common}>
          <path
            d="M12 2C7 2 4 6 4 10s3 7 8 7 8-3 8-7-3-8-8-8z"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
          />
          <circle cx="12" cy="10" r="1.6" fill="currentColor" />
        </svg>
      );
    case "dating":
      return (
        <svg {...common}>
          <path
            d="M12 21s-7-4.35-9-8c-1.5-2.8.5-6 4-6 2 0 3 1.5 5 1.5S16 8 18 8c3.5 0 5.5 3.2 4 6-2 3.65-9 8-9 8z"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      );
    case "holidays":
      return (
        <svg {...common}>
          <path
            d="M12 2l3 6 6 1-4.5 4L18 22l-6-3-6 3 1.5-8L3 9l6-1 3-6z"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      );
    case "hobbies":
      return (
        <svg {...common}>
          <path
            d="M3 21v-4l10-9 8 7v5H3z"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M12 7v6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "food":
      return (
        <svg {...common}>
          <path
            d="M3 7h18v6a4 4 0 01-4 4H7a4 4 0 01-4-4V7z"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
          />
        </svg>
      );
    case "nightlife":
      return (
        <svg {...common}>
          <path
            d="M7 20h10l-1-7H8l-1 7zM12 3v6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case "workshop":
      return (
        <svg {...common}>
          <path
            d="M3 21v-4l10-9 8 7v5H3z"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M12 7v6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function HomePage() {
  return (
    <div style={{ width: "100%", margin: 0 }}>
      <div style={{ width: "100%", height: "50vh", overflow: "hidden" }}>
        <img
          src={eventHome}
          alt="Event home"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <style>{`
        .categories { display:flex; gap:16px; justify-content:center; align-items:center; margin-top:18px; flex-wrap:wrap; padding:8px 16px; }
        .cat-item { display:flex; flex-direction:column; align-items:center; width:96px; }
        .cat { width:76px; height:76px; border-radius:50%; background:#fff; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 6px rgba(0,0,0,0.06); transition:transform .18s, box-shadow .18s; cursor:pointer; border:1px solid #f2f2f2; }
        .cat:focus { outline: none; box-shadow:0 8px 20px rgba(0,0,0,0.08); transform:translateY(-2px); }
        .cat:hover { transform:scale(1.06); box-shadow:0 10px 22px rgba(0,0,0,0.10); border-color:#e9e9e9; }
        .cat svg { width:28px; height:28px; color:#333; }
        .cat-label { margin-top:8px; font-size:13px; text-align:center; color:#333; max-width:88px; }
        @media (max-width:480px){ .cat { width:60px; height:60px } .cat-item{ width:72px } }
      `}</style>

      <div className="categories" role="list" aria-label="Event categories">
        {categories.map((c) => (
          <div key={c.id} className="cat-item" role="listitem">
            <button
              type="button"
              className="cat"
              aria-label={c.label}
              onClick={() => console.log("category:", c.id)}
            >
              <Icon id={c.id} />
            </button>
            <div className="cat-label">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
