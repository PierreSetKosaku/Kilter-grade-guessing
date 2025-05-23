import React, { useEffect, useState } from "react";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";

function App() {
  const [imagesToHolds, setImagesToHolds] = useState(null);
  const [usageMap, setUsageMap] = useState(null);
  const [selectedAngle, setSelectedAngle] = useState("20");
  const [selectedHolds, setSelectedHolds] = useState([]);

  // Load JSON data on mount
  useEffect(() => {
    fetch("/board-data.json")
      .then((r) => r.json())
      .then(setImagesToHolds);
    fetch("/usage-map.json")
      .then((r) => r.json())
      .then(setUsageMap);
  }, []);

  if (!imagesToHolds || !usageMap) return <div>Loading…</div>;

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      <Sidebar
        selectedHolds={selectedHolds}
        setSelectedAngle={setSelectedAngle}
        selectedAngle={selectedAngle}
        usageMap={usageMap}
        onReset={() => setSelectedHolds([])}
      />
      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "200px",
        }}
      >
        <Board
          imagesToHolds={imagesToHolds}
          selectedHolds={selectedHolds}
          setSelectedHolds={setSelectedHolds}
        />
      </main>
    </div>
  );
}

export default App;
