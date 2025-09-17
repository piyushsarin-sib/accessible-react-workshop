import Menu from "../../../lib/Collections/Menu";
import "./SelectionExample.css";

// Menu with empty labels but unique keys
const emptyMenuItems = [
  { key: "1", label: "" },
  { key: "2", label: "" },
  { key: "3", label: "" },
  { key: "4", label: "" },
  { key: "5", label: "" },
];

const UncontrolledMenuExample = () => {
  const handleSelect = (event, { selectedItems }) => {
    console.log(`Empty item selected:`, selectedItems, event);
  };

  return (
    <>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>
        Menu with Placeholder Options (Uncontrolled Mode)
      </h3>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
        Menu manages its own selection state internally. Default selection on item "3".
      </p>

      <Menu
        items={emptyMenuItems}
        onSelect={handleSelect}
        defaultSelectedKey="3"
        ariaLabel="Empty options menu"
        allowDeselect={true}
      />

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
