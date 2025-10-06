import { MenuList } from "../../lib/Menu";
import "./SelectionExample.css";

const UncontrolledMenuExample = () => {
  const handleChange = () => {
    // Handle selection change
  };

  return (
    <>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>
        Menu with Placeholder Options (Uncontrolled Mode)
      </h3>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
        Menu manages its own selection state internally. Default selection on item "3".
      </p>

      <MenuList onChange={handleChange} defaultSelectedKey="3" ariaLabel="Empty options menu">
        <MenuList.Option value="1"> </MenuList.Option>
        <MenuList.Option value="2"> </MenuList.Option>
        <MenuList.Option value="3"> </MenuList.Option>
        <MenuList.Option value="4"> </MenuList.Option>
        <MenuList.Option value="5"> </MenuList.Option>
      </MenuList>

      <div style={{ marginTop: "16px", fontSize: "12px", color: "#999" }}>
        <strong>Mode:</strong> Uncontrolled - Menu manages selection internally
        <br />
        <strong>Default Selection:</strong> Item "3"
        <br />
        <strong>Check console:</strong> for selection events
      </div>
    </>
  );
};

export default UncontrolledMenuExample;
