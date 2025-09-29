import { useState } from "react";
import VerticalNavigationExample from "./VerticalNavigationExample";
import HorizontalNavigationExample from "./HorizontalNavigationExample";
import Grid2DNavigationExample from "./Grid2DNavigationExample";

const RovingIndexExample = () => {
  const [activeExample, setActiveExample] = useState("vertical");

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h2 style={{ marginBottom: "20px" }}>🎹 Roving Index Keyboard Navigation</h2>

      <div style={{ marginBottom: "20px" }}>
        <p>Use arrow keys, Home, End, PageUp, PageDown to navigate. Active items have tabindex="0".</p>
      </div>

      {/* Example selector */}
      <div style={{ marginBottom: "30px" }}>
        <label htmlFor="example-selector" style={{ fontWeight: "bold", marginRight: "10px" }}>
          Choose Example:
        </label>
        <select
          id="example-selector"
          value={activeExample}
          onChange={(e) => setActiveExample(e.target.value)}
          style={{ padding: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          <option value="vertical">Vertical List Navigation</option>
          <option value="horizontal">Horizontal Navigation</option>
          <option value="grid">2D Grid Navigation</option>
        </select>
      </div>

      {/* Render selected example */}
      {activeExample === "vertical" && <VerticalNavigationExample />}
      {activeExample === "horizontal" && <HorizontalNavigationExample />}
      {activeExample === "grid" && <Grid2DNavigationExample />}

      {/* Instructions */}
      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#e8f4f8",
          borderRadius: "6px",
          fontSize: "14px",
        }}
      >
        <h4>🎯 Navigation Instructions:</h4>
        <ul style={{ marginBottom: "0", paddingLeft: "20px" }}>
          <li><strong>Vertical:</strong> ↑↓ navigate, ←→ ignored (allows expand/collapse)</li>
          <li><strong>Horizontal:</strong> ←→ navigate, ↑↓ ignored</li>
          <li><strong>2D Grid:</strong> ←→↑↓ all work with auto-detection</li>
          <li><strong>Home/End:</strong> Jump to first/last item</li>
          <li><strong>Click:</strong> Focus and activate any item</li>
          <li><strong>Tab:</strong> Only active item is in tab order (roving tabindex)</li>
        </ul>
      </div>
    </div>
  );
};

export default RovingIndexExample;