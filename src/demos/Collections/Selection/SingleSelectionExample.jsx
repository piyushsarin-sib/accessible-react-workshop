import SimpleMenuExample from "./SimpleMenuExample";
import MenuWithTitlesExample from "./MenuWithTitlesExample";
import "./SelectionExample.css";

const SingleSelectionExample = () => {
  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <SimpleMenuExample />
      <MenuWithTitlesExample />
    </div>
  );
};

export default SingleSelectionExample;
