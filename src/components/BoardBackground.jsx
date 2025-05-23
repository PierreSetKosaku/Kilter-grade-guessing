import React from "react";

function BoardBackground({
  imagesToHolds,
  width,
  height,
  svgId = "svg-climb",
  children,
}) {
  const imageKeys = Object.keys(imagesToHolds);

  return (
    <svg
      id={svgId}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        display: "block",
        background: "#f5f5f5",
        border: "1px solid #ccc",
      }}
    >
      {imageKeys.map((imageUrl) => (
        <image
          key={imageUrl}
          href={imageUrl}
          width={width}
          height={height}
          x={0}
          y={0}
        />
      ))}
      {children}
    </svg>
  );
}

export default BoardBackground;
