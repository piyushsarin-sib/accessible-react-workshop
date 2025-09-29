import { useState } from "react";
import Menu from "../../../lib/Collections/Menu";

const SectionedMenuExample = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const handleChange = (_event, { selectedKeys }) => {
    setSelectedKeys(selectedKeys);
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
        selectedKeys={selectedKeys}
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
        <strong>Selected:</strong> {selectedKeys[0] || "None"}
      </div>
    </div>
  );
};

export default SectionedMenuExample;