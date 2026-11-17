// The hold-to-activate SOS button. Moved out of App.jsx in Phase 2 (no behaviour change).
import { useState, useEffect, useRef } from "react";
import { COLORS } from "../styles/theme";

// How long the user must keep holding the SOS button before it triggers.
// The on-screen hint text is generated from this constant, so the label and
// the real behaviour cannot drift apart. (Before Phase 1 the label said
// "3 seconds" but the code actually fired after roughly 1.7 seconds.)
const SOS_HOLD_MS = 3000;
// How often the progress ring is redrawn while the button is held.
const SOS_TICK_MS = 50;

function SOSButton({ onActivate }) {
  const [held, setHeld] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activated, setActivated] = useState(false);
  const interval = useRef(null);
  const startedAt = useRef(0);

  // If the button disappears mid-hold (e.g. the user switches tab), stop the timer.
  useEffect(() => () => clearInterval(interval.current), []);

  const startHold = () => {
    if (activated) return;
    // Touch screens can fire both touch and mouse events for one press;
    // make sure we never end up with two timers running.
    clearInterval(interval.current);
    setHeld(true);
    startedAt.current = Date.now();
    interval.current = setInterval(() => {
      // Measure real elapsed time instead of counting ticks, so the hold
      // duration is accurate even if the browser delays a timer callback.
      const elapsed = Date.now() - startedAt.current;
      if (elapsed >= SOS_HOLD_MS) {
        clearInterval(interval.current);
        setProgress(100);
        setActivated(true);
        onActivate?.();
      } else {
        setProgress((elapsed / SOS_HOLD_MS) * 100);
      }
    }, SOS_TICK_MS);
  };

  const endHold = () => {
    if (!activated) {
      setHeld(false);
      setProgress(0);
      clearInterval(interval.current);
    }
  };

  const reset = () => {
    setActivated(false);
    setProgress(0);
    setHeld(false);
  };

  const circumference = 2 * Math.PI * 54;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      {activated && (
        // HONESTY NOTE: at this stage "activated" only changes what this screen shows.
        // Nothing is sent to anyone. The message says so, and offers a real tel: link.
        <div style={{ background: "#F39C1222", border: "1px solid #F39C1255", borderRadius: 12, padding: "10px 16px", fontSize: 12, color: "#F5A623", textAlign: "center", maxWidth: 300, lineHeight: 1.5 }}>
          <div style={{ fontWeight: 700, fontSize: 13 }}>⚠️ SOS triggered on this device only</div>
          <div style={{ color: COLORS.muted, margin: "4px 0 8px" }}>
            This prototype has not contacted anyone. No SMS, call, or alert was sent.
          </div>
          <a
            href="tel:112"
            style={{ display: "inline-block", background: COLORS.primaryLight, color: "#fff", borderRadius: 20, padding: "6px 16px", fontWeight: 700, fontSize: 12, textDecoration: "none" }}
          >
            📞 Call 112 now
          </a>
        </div>
      )}
      <div
        style={{ position: "relative", width: 140, height: 140, cursor: "pointer", userSelect: "none" }}
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        onTouchCancel={endHold}
      >
        <svg width="140" height="140" style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
          <circle cx="70" cy="70" r="54" fill="none" stroke="#2A2A2A" strokeWidth="6" />
          <circle
            cx="70" cy="70" r="54"
            fill="none"
            stroke={activated ? COLORS.medium : "#E74C3C"}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            strokeLinecap="round"
            style={{ transition: `stroke-dashoffset ${SOS_TICK_MS}ms linear` }}
          />
        </svg>
        <div
          style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 100, height: 100, borderRadius: "50%",
            background: activated ? "linear-gradient(135deg, #F39C12, #B9770E)" : held ? "linear-gradient(135deg, #C0392B, #8E1010)" : "linear-gradient(135deg, #E74C3C, #C0392B)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            boxShadow: held ? `0 0 30px ${COLORS.accent}66` : "0 4px 20px #E74C3C33",
            transition: "all 0.2s",
          }}
        >
          <span style={{ fontSize: 28 }}>{activated ? "⚠️" : "🆘"}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: 2 }}>
            {activated ? "TRIGGERED" : "SOS"}
          </span>
        </div>
      </div>
      <p style={{ fontSize: 12, color: COLORS.muted, margin: 0 }}>
        {activated ? <span style={{ color: COLORS.medium, cursor: "pointer" }} onClick={reset}>Tap to dismiss</span> : `Hold ${SOS_HOLD_MS / 1000} seconds to activate`}
      </p>
    </div>
  );
}

export default SOSButton;
