// Community tab. Everything on it is clearly-labelled SAMPLE data (see the note below).
import { COLORS } from "../../styles/theme";

// SAMPLE DATA ONLY. These rows exist to show what the layout will look like.
// They are not real reports, not real places, and not real people, which is why
// the places are called "Demo Zone N" instead of using real neighbourhood names.
const SAMPLE_REPORTS = [
  { area: "Demo Zone 1", time: "sample", type: "Harassment", severity: "high" },
  { area: "Demo Zone 2", time: "sample", type: "Unsafe lighting", severity: "medium" },
  { area: "Demo Zone 3", time: "sample", type: "Threatening behaviour", severity: "high" },
  { area: "Demo Zone 4", time: "sample", type: "Pickpocketing", severity: "medium" },
];

function CommunityScreen() {
  return (
    <div style={{ padding: "16px" }}>
      <h3 style={{ fontSize: 16, color: COLORS.text, margin: "0 0 4px", fontWeight: 600 }}>Community Reports</h3>
      <p style={{ fontSize: 12, color: COLORS.muted, margin: "0 0 12px" }}>Planned feature. Not implemented yet.</p>

      <div style={{ background: "#F39C1222", border: "1px solid #F39C1255", borderRadius: 12, padding: "10px 12px", marginBottom: 16, fontSize: 12, color: "#F5A623", lineHeight: 1.5 }}>
        🧪 SAMPLE DATA. There is no reporting system and no real reports yet. The entries below are placeholders.
      </div>

      {SAMPLE_REPORTS.map((r, i) => (
        <div key={i} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: "12px", marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{r.area}</span>
            <span style={{ fontSize: 11, color: COLORS.muted }}>{r.time}</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{
              fontSize: 11, padding: "2px 8px", borderRadius: 10,
              background: r.severity === "high" ? "#E74C3C22" : "#F39C1222",
              color: r.severity === "high" ? "#FF6B6B" : "#F5A623",
            }}>{r.type}</span>
            <span style={{ fontSize: 11, color: COLORS.muted }}>sample entry</span>
          </div>
        </div>
      ))}

      <button
        disabled
        style={{ width: "100%", padding: "12px", background: COLORS.primaryLight, border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "not-allowed", opacity: 0.45, marginTop: 8 }}
      >
        + Report an Incident (not available yet)
      </button>
    </div>
  );
}

export default CommunityScreen;
