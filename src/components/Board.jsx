import React from "react";

const width = 1080;
const dataHeight = 1350; // Raw board data (do not change)
const displayHeight = 950; // Displayed height (change to your liking)

const radiusByImage = {
  "36-1.png": 20,
  "38-1.png": 13,
};

function Board({ imagesToHolds, selectedHolds, setSelectedHolds }) {
  let allHolds = [];
  Object.entries(imagesToHolds).forEach(([img, holds]) => {
    holds.forEach((h) =>
      allHolds.push({ holdId: h[0], x: h[2], y: h[3], image: img })
    );
  });

  const toggleHold = (holdId) => {
    setSelectedHolds((selected) =>
      selected.includes(holdId)
        ? selected.filter((id) => id !== holdId)
        : [...selected, holdId]
    );
  };

  return (
    <svg
      width={width}
      height={displayHeight} // <= Only display this tall
      viewBox={`0 0 ${width} ${dataHeight}`} // <= Show full data area
      style={{
        background: "#f9f9fa",
        border: "1px solid #aaa",
        display: "block",
      }}
    >
      {Object.keys(imagesToHolds).map((img) => (
        <image
          key={img}
          href={`${process.env.PUBLIC_URL}/${img}`}
          x={0}
          y={0}
          width={width}
          height={dataHeight}
          style={{ pointerEvents: "none" }}
        />
      ))}

      {allHolds.map(({ holdId, x, y, image }) => {
        const r = radiusByImage[image.replace(/^\//, "")] || 15;
        const selected = selectedHolds.includes(holdId);
        return (
          <circle
            key={holdId}
            cx={x * (width / 144)}
            cy={dataHeight - y * (dataHeight / 180)}
            r={r}
            fill="#222"
            fillOpacity={0}
            stroke={selected ? "#2363eb" : "transparent"}
            strokeWidth={selected ? 4 : 0}
            style={{ cursor: "pointer", transition: "stroke .2s" }}
            onClick={() => toggleHold(holdId)}
          />
        );
      })}
    </svg>
  );
}

export default Board;
