import React, { useMemo } from "react";

const gradeRanges = [
  {
    label: "V0–V2",
    grades: ["4a/V0", "4b/V0", "4c/V0", "5a/V1", "5b/V1", "5c/V2"],
  },
  { label: "V3–V4", grades: ["6a/V3", "6a+/V3", "6b/V4", "6b+/V4"] },
  { label: "V5–V6", grades: ["6c/V5", "6c+/V5", "7a/V6", "7a+/V7"] },
  { label: "V7–V8", grades: ["7b/V8", "7b+/V8"] },
  { label: "V9+", grades: ["7c/V9", "7c+/V10", "8a/V11", "8a+/V12"] },
];

// Find all boulders containing *all* of `selectedHolds`
function getMatchingBoulders(usageMap, selectedHolds) {
  if (!selectedHolds.length || !usageMap || !usageMap.boulders) return [];
  return Object.entries(usageMap.boulders).filter(([, info]) =>
    selectedHolds.every((hold) => info.holds.includes(String(hold)))
  );
}

// Fallback: find boulders with the largest possible subset of selected holds
function getFallbackMatchingBoulders(usageMap, selectedHolds) {
  if (!selectedHolds.length || !usageMap || !usageMap.boulders) return [];
  let maxFound = 0;
  let candidates = [];
  for (const [, info] of Object.entries(usageMap.boulders)) {
    const found = selectedHolds.filter((hold) =>
      info.holds.includes(String(hold))
    ).length;
    if (found > maxFound) {
      maxFound = found;
      candidates = [info];
    } else if (found === maxFound && found > 0) {
      candidates.push(info);
    }
  }
  return maxFound > 0 ? candidates : [];
}

function getGradeDistribution(usageMap, selectedHolds) {
  let matchingBoulders = getMatchingBoulders(usageMap, selectedHolds);

  // If none match all holds, try fallback with largest intersection
  let usedFallback = false;
  if (matchingBoulders.length === 0 && selectedHolds.length && usageMap) {
    matchingBoulders = getFallbackMatchingBoulders(usageMap, selectedHolds).map(
      (info) => [null, info]
    );
    usedFallback = true;
  }

  // Tally grades
  const gradeCounts = {};
  for (const [, info] of matchingBoulders) {
    const grade = info.grade;
    gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
  }
  return { gradeCounts, usedFallback };
}

function groupByRanges(gradeCounts) {
  const rangeCounts = {};
  let total = 0;
  gradeRanges.forEach(({ label }) => (rangeCounts[label] = 0));
  for (const [grade, count] of Object.entries(gradeCounts)) {
    total += count;
    for (const { label, grades } of gradeRanges) {
      if (grades.includes(grade)) {
        rangeCounts[label] += count;
        break;
      }
    }
  }
  return { rangeCounts, total };
}

export default function GradeSidebar({
  selectedHolds,
  usageMap,
  selectedAngle,
}) {
  // Defensive: always check for existence before dereferencing
  const usageMapForAngle = useMemo(
    () => usageMap?.[selectedAngle],
    [usageMap, selectedAngle]
  );

  const { gradeCounts, usedFallback } = useMemo(
    () => getGradeDistribution(usageMapForAngle, selectedHolds),
    [usageMapForAngle, selectedHolds]
  );

  const { rangeCounts, total } = useMemo(
    () => groupByRanges(gradeCounts),
    [gradeCounts]
  );

  return (
    <div>
      <h2>Grade Guesser</h2>
      <div>
        <strong>Selected Holds:</strong>
        <div style={{ margin: "6px 0 16px" }}>
          {selectedHolds.length ? selectedHolds.join(", ") : <span>None</span>}
        </div>
      </div>
      {total === 0 ? (
        <p style={{ color: "#888" }}>No data for this selection.</p>
      ) : (
        <div>
          <strong>Estimated Grade Range:</strong>
          {usedFallback && (
            <div style={{ color: "#e87c2c", fontSize: 12, marginBottom: 6 }}>
              No boulders with all selected holds. Showing best match.
            </div>
          )}
          <ul style={{ margin: "12px 0" }}>
            {Object.entries(rangeCounts).map(([range, count]) =>
              count > 0 ? (
                <li key={range}>
                  <span style={{ fontWeight: 600 }}>{range}</span>
                  {` — `}
                  {((count / total) * 100).toFixed(1)}%{" "}
                  <span style={{ color: "#aaa", fontSize: 12 }}>
                    ({count} boulders)
                  </span>
                </li>
              ) : null
            )}
          </ul>
          <div>
            <strong>Total matching boulders:</strong> {total}
          </div>
        </div>
      )}
    </div>
  );
}
