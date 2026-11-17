// App shell: header, bottom navigation, and which screen is showing.
// Phase 2: every screen now lives in components/screens/, the colours in styles/theme.js,
// and the map in components/LiveMap.jsx. This file only decides what to show.
import { useState } from "react";
import { COLORS } from "./styles/theme";
import LiveMap from "./components/LiveMap";
import HomeScreen from "./components/screens/HomeScreen";
import CommunityScreen from "./components/screens/CommunityScreen";
import HelpScreen from "./components/screens/HelpScreen";
import SettingsScreen from "./components/screens/SettingsScreen";

const FEATURES = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "map", icon: "🗺️", label: "Map" },
  { id: "community", icon: "👥", label: "Community" },
  { id: "help", icon: "🆘", label: "Help" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px 0", background: "transparent" }}>
      <div style={{
        width: 380,
        height: 700,
        background: COLORS.bg,
        borderRadius: 32,
        border: `2px solid #2A2A2A`,
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: "0 20px 60px #00000099",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

        {/* Header. The badge used to say "Protected" in green no matter what was happening,
            which is a claim this prototype cannot back up, so it now says what it is. */}
        <div style={{ background: "#111", padding: "16px 20px 12px", borderBottom: `1px solid #1E1E1E`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.accent, letterSpacing: -0.5 }}>♀ Shakti</div>
            <div style={{ fontSize: 10, color: COLORS.muted, letterSpacing: 2 }}>WOMEN SAFETY PLATFORM</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.medium }} />
            <div style={{ fontSize: 11, color: COLORS.medium }}>Prototype</div>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflow: activeTab === "map" ? "hidden" : "auto",
            position: "relative",
          }}
        >
          {activeTab === "home" && <HomeScreen />}
          {activeTab === "map" && (
            <div style={{ height: "100%", width: "100%", flex: 1, position: "relative" }}>
              <LiveMap />
            </div>
          )}
          {activeTab === "community" && <CommunityScreen />}
          {activeTab === "help" && <HelpScreen />}
          {activeTab === "settings" && (
            <SettingsScreen />
          )}
        </div>

        {/* Bottom Nav */}
        <div style={{ background: "#111", borderTop: `1px solid #1E1E1E`, padding: "8px 0", display: "flex" }}>
          {FEATURES.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveTab(f.id)}
              style={{
                flex: 1, background: "none", border: "none",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                cursor: "pointer", padding: "6px 0",
              }}
            >
              <span style={{ fontSize: 18 }}>{f.icon}</span>
              <span style={{ fontSize: 10, color: activeTab === f.id ? COLORS.accent : COLORS.muted, fontWeight: activeTab === f.id ? 600 : 400 }}>
                {f.label}
              </span>
              {activeTab === f.id && <div style={{ width: 20, height: 2, background: COLORS.accent, borderRadius: 1 }} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
