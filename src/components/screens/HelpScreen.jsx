// Help tab: real tel: links to emergency numbers.
import { COLORS } from "../../styles/theme";

function HelpScreen() {
  return (
    <div style={{ padding: "16px" }}>
      <h3 style={{ fontSize: 16, color: COLORS.text, margin: "0 0 4px", fontWeight: 600 }}>Emergency Help</h3>
      <p style={{ fontSize: 12, color: COLORS.muted, margin: "0 0 4px" }}>Tap Call to open your phone's dialer with the number filled in</p>
      <p style={{ fontSize: 11, color: COLORS.muted, margin: "0 0 16px" }}>On a computer without a calling app, these links may do nothing.</p>

      {[
        { name: "Police", number: "100", icon: "🚔", color: "#2980B9" },
        { name: "Women Helpline", number: "1091", icon: "👩‍💼", color: "#8E44AD" },
        { name: "Emergency (All)", number: "112", icon: "🚨", color: "#E74C3C" },
        { name: "Ambulance", number: "108", icon: "🚑", color: "#27AE60" },
        { name: "Childline", number: "1098", icon: "👧", color: "#E67E22" },
        { name: "Cyber Crime", number: "1930", icon: "💻", color: "#16A085" },
      ].map(h => (
        <div key={h.name} style={{ display: "flex", alignItems: "center", gap: 12, background: COLORS.card, border: `1px solid ${h.color}33`, borderRadius: 12, padding: "14px", marginBottom: 10 }}>
          <div style={{ fontSize: 24 }}>{h.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{h.name}</div>
            <div style={{ fontSize: 13, color: h.color, fontWeight: 700 }}>{h.number}</div>
          </div>
          {/* A real tel: link: on a phone this opens the dialer with the number ready. */}
          <a
            href={`tel:${h.number}`}
            aria-label={`Call ${h.name} on ${h.number}`}
            style={{ display: "inline-block", textDecoration: "none", background: h.color + "22", border: `1px solid ${h.color}55`, color: h.color, borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
          >
            Call
          </a>
        </div>
      ))}
    </div>
  );
}

export default HelpScreen;
