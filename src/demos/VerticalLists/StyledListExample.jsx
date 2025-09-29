import Collection from "../../lib/Collections/Collection";
import "./ListExample.css";

const StyledListExample = () => {
  return (
    <>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "32px", marginBottom: "16px" }}>
        File List with Styled Items
      </h3>

      <Collection 
        as="ul" 
        itemAs="li" 
        indentSize={16} 
        className="list-styled-container"
        pattern="list"
        ariaLabel="Project file list"
      >
        <Collection.Item className="list-level1-item">Project A</Collection.Item>

        <Collection.Item className="list-level1-item">
          Project B
          <Collection as="ul" itemAs="li">
            <Collection.Item className="list-level2-item">Task B.1</Collection.Item>
            <Collection.Item className="list-level2-item">
              Task B.2
              <Collection as="ul" itemAs="li">
                <Collection.Item className="list-level3-item">Subtask B.2.1</Collection.Item>
              </Collection>
            </Collection.Item>
          </Collection>
        </Collection.Item>

        <Collection.Item className="list-level1-item">Project C</Collection.Item>
      </Collection>
    </>
  );
};

export default StyledListExample;
