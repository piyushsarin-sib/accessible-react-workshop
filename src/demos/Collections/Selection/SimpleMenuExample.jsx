import { useState } from "react";
import Menu from "../../../lib/Collections/Menu";

const SimpleMenuExample = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const handleChange = (_event, { selectedKeys }) => {
    setSelectedKeys(selectedKeys);
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
        selectedKeys={selectedKeys}
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
        {selectedKeys[0] || "None"}
        <br />
        <strong>Selected Keys:</strong>{" "}
        {selectedKeys.length > 0 ? selectedKeys.join(', ') : "None"}
      </div>
    </>
  );
};

export default SimpleMenuExample;