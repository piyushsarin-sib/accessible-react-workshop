import Collection from "../../../lib/Collections/Collection";
import "./HorizontalListExample.css";

const ButtonGroupExample = () => {
  return (
    <>
      <h3 style={{ fontSize: "16px", fontWeight: "bold", marginTop: "24px", marginBottom: "12px" }}>
        Button Group
      </h3>
      <Collection as="div" itemAs="button" className="horizontal-buttons" itemClassName="btn-item">
        <Collection.Item>Save</Collection.Item>
        <Collection.Item>Cancel</Collection.Item>
        <Collection.Item>Delete</Collection.Item>
      </Collection>
    </>
  );
};

export default ButtonGroupExample;
