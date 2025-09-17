import BasicListExample from "./BasicListExample";
import StyledListExample from "./StyledListExample";
import NestedCollectionWithTitlesExample from "./NestedCollectionWithTitlesExample";

const ListExample = () => {
  return (
    <div style={{ padding: "16px" }}>
      <BasicListExample />
      <StyledListExample />
      <NestedCollectionWithTitlesExample />
    </div>
  );
};
export default ListExample;
