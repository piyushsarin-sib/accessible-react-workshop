import { useState } from "react";
import Menu from "../../../lib/Collections/Menu";
import "./SelectionExample.css";

const menuItems = [
  { key: "new", label: "New File", icon: "📄" },
  { key: "open", label: "Open File", icon: "📁" },
  { key: "save", label: "Save", icon: "💾" },
  { key: "export", label: "Export", icon: "📤" },
  { key: "print", label: "Print", icon: "🖨️" },
];

const SingleSelectionExample = () => {
  const [selectedKey, setSelectedKey] = useState(null);

  const handleChange = (key) => {
    console.log(`Menu selection changed to: ${key}`);
    setSelectedKey(key);
  };

  const selectedItem = selectedKey ? menuItems.find(item => item.key === selectedKey) : null;

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>
        Single Selection Menu (controlled mode)
      </h3>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
        Click items to select. Only one item can be selected at a time.
      </p>

      <Menu
        items={menuItems}
        selectedKey={selectedKey}
        onChange={handleChange}
        ariaLabel="File operations menu"
        allowDeselect={true}
      />

      <div style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
        <strong>Selected:</strong>{" "}
        {selectedItem?.label || "None"}
        <br />
        <strong>Selected Key:</strong>{" "}
        {selectedKey || "None"}
      </div>
    </div>
  );
};

export default SingleSelectionExample;
