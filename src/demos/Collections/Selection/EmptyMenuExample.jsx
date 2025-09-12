import React, { useState } from "react";
import Menu from "../../../lib/Collections/Menu";
import "./SelectionExample.css";

// Menu with empty labels but unique keys
const emptyMenuItems = [
  { key: "1", label: "", isEmpty: true },
  { key: "2", label: "", isEmpty: true },
  { key: "3", label: "", isEmpty: true },
  { key: "4", label: "", isEmpty: true },
  { key: "5", label: "", isEmpty: true },
];

const EmptyMenuExample = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (selectedItem, key) => {
    console.log(`Empty item clicked: ${key}`);
    setSelectedItem(selectedItem);
    console.log(`Selection changed to:`, selectedItem);
  };

  return (
    <>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>
        Menu with Placeholder Options (Unique Keys)
      </h3>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
        Menu placeholder items but functional selection using unique keys.
      </p>

      <Menu
        items={emptyMenuItems}
        onSelect={handleSelect}
        ariaLabel="Empty options menu"
        allowDeselect={true}
      />

      <div style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
        <strong>Selected Key:</strong> {selectedItem?.key || "None"}
      </div>

      <div style={{ marginTop: "8px", fontSize: "12px", color: "#999" }}>
        <strong>Selected Item:</strong> {selectedItem?.key || "None"}
      </div>
    </>
  );
};

export default EmptyMenuExample;
