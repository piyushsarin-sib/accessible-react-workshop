import { useState } from "react";
import Menu from "../../../lib/Collections/Menu";

const SimpleMenuExample = () => {
  const [selectedKey, setSelectedKey] = useState(null);

  const handleChange = (_event, { selectedItems }) => {
    setSelectedKey(selectedItems[0]?.key || null);
  };

  return (
    <>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>
        Single Selection Menu (controlled mode)
      </h3>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
        Click items to select. Only one item can be selected at a time.
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

      <div style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
        <strong>Selected:</strong>{" "}
        {selectedKey || "None"}
        <br />
        <strong>Selected Key:</strong>{" "}
        {selectedKey || "None"}
      </div>
    </>
  );
};

export default SimpleMenuExample;