import { useState } from "react";
import Menu from "../../../lib/Collections/Menu";

const SectionedMenuExample = () => {
  const [selectedKey, setSelectedKey] = useState(null);

  const handleChange = (_event, { selectedItems }) => {
    setSelectedKey(selectedItems[0]?.key || selectedItems[0]?.value || null);
  };

  return (
    <div>
      <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>
        📂 Sectioned Menu with Disabled Items
      </h4>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
        Menu with sections and disabled items - perfect for organized navigation
      </p>

      <Menu
        selectedKey={selectedKey}
        onChange={handleChange}
        ariaLabel="File operations with component API"
      >
        <Menu.Title>📁 File Operations</Menu.Title>
        <Menu.Option value="new">📄 New File</Menu.Option>
        <Menu.Option value="open">📁 Open File</Menu.Option>
        <Menu.Option value="save">💾 Save</Menu.Option>

        <Menu.Title>📤 Export & Print</Menu.Title>
        <Menu.Option value="export">📤 Export</Menu.Option>
        <Menu.Option value="print">🖨️ Print</Menu.Option>
        <Menu.Option value="pdf" disabled>📋 Export PDF (Pro)</Menu.Option>
      </Menu>

      <div style={{ marginTop: "12px", fontSize: "14px", color: "#666" }}>
        <strong>Selected:</strong> {selectedKey || "None"}
      </div>
    </div>
  );
};

export default SectionedMenuExample;