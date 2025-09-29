import { useState } from "react";
import Menu from "../../../lib/Collections/Menu";

const MenuWithTitlesExample = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const handleChange = (_event, { selectedKeys }) => {
    setSelectedKeys(selectedKeys);
  };

  return (
    <div style={{ marginTop: "32px" }}>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>
        Menu with Titles
      </h3>

      <div>
        <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>
          🧩 Menu with Section Headers
        </h4>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
          Using Menu.Title components for organized sections
        </p>

        <Menu
          selectedKeys={selectedKeys}
          onChange={handleChange}
          ariaLabel="Menu with sections"
        >
          <Menu.Title>📁 File Operations</Menu.Title>
          <Menu.Option value="new">📄 New File</Menu.Option>
          <Menu.Option value="open">📁 Open File</Menu.Option>
          <Menu.Option value="save">💾 Save</Menu.Option>

          <Menu.Title>📋 Recent Files</Menu.Title>
          <Menu.Option value="doc1">📝 Document1.txt</Menu.Option>
          <Menu.Option value="doc2">📊 Presentation.pptx</Menu.Option>
          <Menu.Option value="doc3">📈 Spreadsheet.xlsx</Menu.Option>

          <Menu.Title>✏️ Edit Operations</Menu.Title>
          <Menu.Option value="undo">↶ Undo</Menu.Option>
          <Menu.Option value="redo">↷ Redo</Menu.Option>
          <Menu.Option value="cut">✂️ Cut</Menu.Option>
        </Menu>

        <div style={{ marginTop: "12px", fontSize: "14px", color: "#666" }}>
          <strong>Selected:</strong> {selectedKeys[0] || "None"}
        </div>
      </div>
    </div>
  );
};

export default MenuWithTitlesExample;