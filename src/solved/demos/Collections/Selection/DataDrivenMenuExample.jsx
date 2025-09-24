import { useState } from "react";
import Menu from "../../../lib/Collections/Menu";

const CompoundAPIMenuExample = () => {
  const [selectedKey, setSelectedKey] = useState(null);

  const handleChange = (_event, { selectedItems }) => {
    setSelectedKey(selectedItems[0]?.key || null);
  };

  return (
    <div style={{ marginBottom: "32px" }}>
      <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>
        🧩 Compound API Menu
      </h4>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
        Using Menu.Option components - perfect for static, design-time structure
      </p>

      <Menu
        selectedKey={selectedKey}
        onChange={handleChange}
        ariaLabel="File operations menu"
      >
        <Menu.Option value="new">📄 New File</Menu.Option>
        <Menu.Option value="open">📁 Open File</Menu.Option>
        <Menu.Option value="save">💾 Save</Menu.Option>
        <Menu.Option value="export">📤 Export</Menu.Option>
        <Menu.Option value="print">🖨️ Print</Menu.Option>
      </Menu>

      <div style={{ marginTop: "12px", fontSize: "14px", color: "#666" }}>
        <strong>Selected:</strong> {selectedKey || "None"}
      </div>
    </div>
  );
};

export default CompoundAPIMenuExample;