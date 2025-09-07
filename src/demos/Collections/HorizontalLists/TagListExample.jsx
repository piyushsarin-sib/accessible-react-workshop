import Collection from "../../../lib/Collections/Collection";
import "./HorizontalListExample.css";

const TagListExample = () => {
  return (
    <>
      <h3 style={{ fontSize: "16px", fontWeight: "bold", marginTop: "24px", marginBottom: "12px" }}>
        Tag List
      </h3>
      <Collection as="div" itemAs="span" className="horizontal-tags" itemClassName="tag-item">
        <Collection.Item>React</Collection.Item>
        <Collection.Item>JavaScript</Collection.Item>
        <Collection.Item>CSS</Collection.Item>
        <Collection.Item>HTML</Collection.Item>
        <Collection.Item>Accessibility</Collection.Item>
      </Collection>
    </>
  );
};

export default TagListExample;
