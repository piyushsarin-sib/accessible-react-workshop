import SimpleMenuExample from "./SimpleMenuExample";
import SectionedMenuExample from "./ComponentAPIMenuExample";
import "./SelectionExample.css";

const SingleSelectionExample = () => {

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>
        Single Selection Menu Examples
      </h3>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
        Demonstrating different Menu component patterns using the compound API.
      </p>

      <SimpleMenuExample />
      <SectionedMenuExample />
    </div>
  );
};

export default SingleSelectionExample;
