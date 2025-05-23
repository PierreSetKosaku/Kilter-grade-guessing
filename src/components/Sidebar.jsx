import React from "react";
import GradeSidebar from "./GradeSidebar";

const angleOptions = ["20", "30", "40", "45", "50", "60", "70"];

export default function Sidebar({
  usageMap,
  selectedHolds,
  setSelectedAngle,
  selectedAngle,
  onReset,
}) {
  return (
    <div
      className="sidebar"
      style={{
        padding: 24,
        background: "#fafafd",
        minWidth: 220,
        borderRight: "1px solid #eee",
      }}
    >
      <aside
        style={{
          width: 250,
          padding: 24,
          borderRight: "1px solid #ddd",
          background: "#fafbfc",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          minHeight: "100vh",
        }}
      >
        <label style={{ fontWeight: "bold", marginBottom: 10 }}>
          Angle:
          <select
            value={selectedAngle}
            onChange={(e) => setSelectedAngle(e.target.value)}
            style={{ marginLeft: 12, padding: 3, fontSize: 16 }}
          >
            {angleOptions.map((angle) => (
              <option key={angle} value={angle}>
                {angle}°
              </option>
            ))}
          </select>
          <GradeSidebar
            usageMap={usageMap}
            selectedAngle={selectedAngle}
            selectedHolds={selectedHolds}
          />
          <button
            onClick={onReset}
            style={{
              marginBottom: "10px",
              padding: "4px 12px",
              background: "#eee",
              border: "1px solid #bbb",
              borderRadius: 4,
              cursor: "pointer",
            }}
            disabled={selectedHolds.length === 0}
          >
            Reset
          </button>
        </label>
      </aside>
    </div>
  );
}
