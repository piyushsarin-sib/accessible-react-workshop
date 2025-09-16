import NavigationMenuExample from "./NavigationMenuExample";
import ButtonGroupExample from "./ButtonGroupExample";
import TagListExample from "./TagListExample";
import CardGridExample from "./CardGridExample";

const HorizontalListExample = () => {
  return (
    <div style={{ padding: "16px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
        Horizontal Collection Examples
      </h2>

      <NavigationMenuExample />
      <ButtonGroupExample />
      <TagListExample />
      <CardGridExample />
    </div>
  );
};

export default HorizontalListExample;