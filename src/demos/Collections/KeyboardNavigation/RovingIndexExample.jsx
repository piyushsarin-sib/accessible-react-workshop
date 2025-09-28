import { useState } from "react";
import Collection from "../../../lib/Collections/Collection";
import { useRovingIndex } from "../../../lib/Collections/hooks/useRovingIndex";

const RovingIndexExample = () => {
  // Sample data for different navigation examples
  const listItems = [
    { id: 1, label: "📧 Email", description: "Check your email messages" },
    { id: 2, label: "📅 Calendar", description: "View your schedule" },
    { id: 3, label: "📋 Tasks", description: "Manage your todo list" },
    { id: 4, label: "📊 Reports", description: "View analytics and reports" },
    { id: 5, label: "⚙️ Settings", description: "Configure your preferences" },
  ];

  const gridItems = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    label: `Item ${i + 1}`,
    color: `hsl(${(i * 30) % 360}, 70%, 60%)`,
  }));

  // Vertical list navigation
  const verticalNav = useRovingIndex({
    items: listItems,
    orientation: "vertical",
    defaultActiveKey: listItems[0].id,
    onActiveChange: (newKey) => console.log("Vertical nav changed to:", newKey),
  });

  // Horizontal navigation
  const horizontalNav = useRovingIndex({
    items: listItems.slice(0, 4),
    orientation: "horizontal",
    defaultActiveKey: listItems[0].id,
    onActiveChange: (newKey) => console.log("Horizontal nav changed to:", newKey),
  });

  // 2D Grid navigation
  const gridNav = useRovingIndex({
    items: gridItems,
    orientation: "both",
    columnsCount: 4,
    defaultActiveKey: gridItems[0].id,
    onActiveChange: (newKey) => console.log("Grid nav changed to:", newKey),
  });

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

      {/* Vertical List Example */}
      {activeExample === "vertical" && (
        <div>
          <h3>📋 Vertical List (↑↓ only, ←→ ignored for expand/collapse)</h3>
          <Collection
            as="ul"
            itemAs="li"
            className="list-unstyled"
            style={{
              border: "2px solid #007bff",
              borderRadius: "8px",
              padding: "10px",
              backgroundColor: "#f8f9fa",
            }}
            {...verticalNav.getCollectionProps()}
          >
            {listItems.map((item) => (
              <Collection.Item
                key={item.id}
                {...verticalNav.getItemProps(item.id)}
                style={{
                  padding: "12px",
                  margin: "4px 0",
                  borderRadius: "6px",
                  backgroundColor: verticalNav.isActive(item.id) ? "#e3f2fd" : "white",
                  border: verticalNav.isActive(item.id) ? "2px solid #2196f3" : "1px solid #ddd",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <div>
                  <strong>{item.label}</strong>
                  <div style={{ fontSize: "14px", color: "#666" }}>{item.description}</div>
                </div>
              </Collection.Item>
            ))}
          </Collection>
          <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
            Active: {verticalNav.activeKey} (Index: {verticalNav.activeIndex})
          </div>
        </div>
      )}

      {/* Horizontal Navigation Example */}
      {activeExample === "horizontal" && (
        <div>
          <h3>➡️ Horizontal Navigation (←→ only, ↑↓ ignored)</h3>
          <Collection
            as="ul"
            itemAs="li"
            style={{
              display: "flex",
              gap: "10px",
              listStyle: "none",
              padding: "20px",
              border: "2px solid #28a745",
              borderRadius: "8px",
              backgroundColor: "#f8fff9",
            }}
            {...horizontalNav.getCollectionProps()}
          >
            {listItems.slice(0, 4).map((item) => (
              <Collection.Item
                key={item.id}
                {...horizontalNav.getItemProps(item.id)}
                style={{
                  padding: "16px",
                  borderRadius: "8px",
                  backgroundColor: horizontalNav.isActive(item.id) ? "#c8e6c9" : "white",
                  border: horizontalNav.isActive(item.id) ? "2px solid #4caf50" : "1px solid #ddd",
                  cursor: "pointer",
                  textAlign: "center",
                  minWidth: "120px",
                  outline: "none",
                }}
              >
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>
                  {item.label.split(" ")[0]}
                </div>
                <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                  {item.label.split(" ").slice(1).join(" ")}
                </div>
              </Collection.Item>
            ))}
          </Collection>
          <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
            Active: {horizontalNav.activeKey} (Index: {horizontalNav.activeIndex})
          </div>
        </div>
      )}

      {/* 2D Grid Navigation Example */}
      {activeExample === "grid" && (
        <div>
          <h3>🔲 2D Grid Navigation (←→↑↓ to navigate, 4 columns)</h3>
          <Collection
            as="div"
            itemAs="div"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
              padding: "20px",
              border: "2px solid #ff9800",
              borderRadius: "8px",
              backgroundColor: "#fffbf0",
            }}
            {...gridNav.getCollectionProps()}
          >
            {gridItems.map((item) => (
              <Collection.Item
                key={item.id}
                {...gridNav.getItemProps(item.id)}
                style={{
                  padding: "20px",
                  borderRadius: "8px",
                  backgroundColor: gridNav.isActive(item.id) ? item.color : "white",
                  border: gridNav.isActive(item.id) ? "3px solid #ff5722" : "1px solid #ddd",
                  cursor: "pointer",
                  textAlign: "center",
                  fontWeight: gridNav.isActive(item.id) ? "bold" : "normal",
                  color: gridNav.isActive(item.id) ? "white" : "#333",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
              >
                {item.label}
              </Collection.Item>
            ))}
          </Collection>
          <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
            Active: {gridNav.activeKey} (Index: {gridNav.activeIndex}, Position: Row {gridNav.getCurrentPosition().row + 1}, Col {gridNav.getCurrentPosition().col + 1})
          </div>
        </div>
      )}

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