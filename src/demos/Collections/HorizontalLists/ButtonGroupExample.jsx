import Collection from "../../../lib/Collections/Collection";
import "./HorizontalListExample.css";

const ButtonGroupExample = () => {
  return (
    <>
      <h3 style={{ fontSize: "16px", fontWeight: "bold", marginTop: "24px", marginBottom: "12px" }}>
        Button Group
      </h3>
      <Collection 
        as="div" 
        itemAs="button" 
        className="horizontal-buttons" 
        itemClassName="btn-item"
        pattern="toolbar"
        ariaLabel="Document actions"
      >
        <Collection.Item type="button">Save</Collection.Item>
        <Collection.Item type="button">Cancel</Collection.Item>
        <Collection.Item type="button">Delete</Collection.Item>
      </Collection>
    </>
  );
};

export default ButtonGroupExample;
