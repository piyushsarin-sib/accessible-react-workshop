import Collection from "../../../lib/Collections/Collection";
import "./HorizontalListExample.css";

const NavigationMenuExample = () => {
  return (
    <>
      <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px" }}>
        Navigation Menu
      </h3>
      <Collection as="ul" itemAs="li" className="horizontal-nav" itemClassName="nav-item">
        <Collection.Item>Home</Collection.Item>
        <Collection.Item>About</Collection.Item>
        <Collection.Item>Services</Collection.Item>
        <Collection.Item>Contact</Collection.Item>
      </Collection>
    </>
  );
};

export default NavigationMenuExample;
