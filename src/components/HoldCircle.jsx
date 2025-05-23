import React from "react";

// Utility: Get usage count for a hold, from usageMap
function getUsageCount(usageMap, holdId) {
  let total = 0;
  // Example: sum over all grades in all usageMap entries
  for (const session of Object.values(usageMap)) {
    if (session.holds && session.holds[holdId]) {
      total += Object.values(session.holds[holdId]).reduce((a, b) => a + b, 0);
    }
  }
  return total;
}

function HoldCircle({ holdId, x, y, usageMap }) {
  const usageCount = getUsageCount(usageMap, holdId);

  // Just a simple color mapping for now
  let color = "#888";
  if (usageCount > 0) color = "#4CAF50";
  if (usageCount > 2) color = "#FF9800";
  if (usageCount > 6) color = "#F44336";

  return (
    <circle
      cx={x}
      cy={y}
      r={16}
      fill={color}
      stroke="#222"
      strokeWidth={2}
      opacity={0.7}
    >
      <title>{`Hold ${holdId} used ${usageCount} times`}</title>
    </circle>
  );
}

export default HoldCircle;
