// Home tab: greeting, SOS button, feature tiles, sample trusted contacts.
import { COLORS } from "../../styles/theme";
import SOSButton from "../SOSButton";

// Pick a greeting from the local hour. (Before Phase 1 this was hard-coded to
// "Good evening, Priya", which was wrong at most times of day.)
function greetingForHour(hour) {
  if (hour < 5) return "Hello";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 22) return "Good evening";
  return "Hello";
}

// SAMPLE ENTRIES ONLY. Contacts are not stored or notified anywhere yet, and the
// phone numbers are masked on purpose so nobody can dial a real person by accident.
// Only the police line is a real number, so only that row gets a tel: link.
const SAMPLE_CONTACTS = [
  { name: "Mom", phone: "+91 98XXX XXXXX", initial: "M", color: "#E74C3C" },
  { name: "Riya (Friend)", phone: "+91 87XXX XXXXX", initial: "R", color: "#9B59B6" },
  { name: "Bangalore Police", phone: "100", initial: "🚔", color: "#2980B9", callable: true },
];

function HomeScreen() {
  const greeting = greetingForHour(new Date().getHours());

  // Tiles that are not built yet are shown greyed-out and do nothing,
  // instead of pretending to work.
  const tiles = [
    {
      title: "Live Location", icon: "📍", disabled: true,
      desc: "Not built yet. Your position is on the Map tab.",
    },
    {
      title: "Fake Call", icon: "📞",
      desc: "Prototype: shows a placeholder alert only",
      onClick: () => alert("Placeholder only: a realistic fake-call screen has not been built yet. Nothing was triggered."),
    },
    {
      title: "Safe Route", icon: "🛡️", disabled: true,
      desc: "Not built yet",
    },
    {
      title: "Check-in Timer", icon: "⏱️", disabled: true,
      desc: "Not built yet",
    },
  ];

  return (
    <div style={{ padding: "0 0 20px" }}>
      <div style={{ textAlign: "center", padding: "24px 0 16px" }}>
        <p style={{ fontSize: 13, color: COLORS.muted, margin: "0 0 4px" }}>{greeting} 👋</p>
        <h2 style={{ fontSize: 20, color: COLORS.text, margin: 0, fontWeight: 600 }}>Stay safe, stay connected</h2>
      </div>

      <div style={{ display: "flex", justifyContent: "center", padding: "16px 0 24px" }}>
        <SOSButton />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "0 16px" }}>
        {tiles.map(f => (
          <div
            key={f.title}
            onClick={f.disabled ? undefined : f.onClick}
            aria-disabled={f.disabled || undefined}
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: 14,
              padding: "14px 12px",
              cursor: f.disabled ? "not-allowed" : "pointer",
              opacity: f.disabled ? 0.55 : 1,
              transition: "all 0.2s",
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 3 }}>{f.title}</div>
            <div style={{ fontSize: 11, color: COLORS.muted }}>{f.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ margin: "20px 16px 0", background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 14, padding: "14px" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 4 }}>⚡ Trusted Contacts</div>
        <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 10 }}>
          Sample entries only. Contacts are not saved and will not be notified.
        </div>
        {SAMPLE_CONTACTS.map(c => (
          <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: c.color + "33", border: `1px solid ${c.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>{c.initial}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: COLORS.text }}>{c.name}</div>
              <div style={{ fontSize: 11, color: COLORS.muted }}>{c.phone}</div>
            </div>
            {c.callable && (
              <a href={`tel:${c.phone}`} aria-label={`Call ${c.name}`} style={{ fontSize: 18, color: COLORS.safe, textDecoration: "none" }}>📞</a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
