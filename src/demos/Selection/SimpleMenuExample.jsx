import { useState } from "react";
import { MenuList } from "../../lib/Menu";

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

      <MenuList
        selectedKeys={selectedKeys}
        onChange={handleChange}
        ariaLabel="File operations menu"
      >
        <MenuList.Option value="new">📄 New File</MenuList.Option>
        <MenuList.Option value="open">📁 Open File</MenuList.Option>
        <MenuList.Option value="save">💾 Save</MenuList.Option>
        <MenuList.Option value="export">📤 Export</MenuList.Option>
        <MenuList.Option value="print">🖨️ Print</MenuList.Option>
      </MenuList>

      <div style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
        <strong>Selected:</strong> {selectedKeys[0] || "None"}
        <br />
        <strong>Selected Keys:</strong> {selectedKeys.length > 0 ? selectedKeys.join(", ") : "None"}
      </div>
    </>
  );
};

export default SimpleMenuExample;
