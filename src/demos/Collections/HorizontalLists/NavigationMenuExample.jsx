import Collection from "../../../lib/Collections/Collection";
import "./HorizontalListExample.css";

const NavigationMenuExample = () => {
  return (
    <>
      <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px" }}>
        Navigation Menu
      </h3>
      <Collection 
        as="nav" 
        itemAs="a" 
        className="horizontal-nav" 
        itemClassName="nav-item"
        pattern="navigation"
        ariaLabel="Main navigation"
      >
        <Collection.Item href="/">Home</Collection.Item>
        <Collection.Item href="/about">About</Collection.Item>
        <Collection.Item href="/services">Services</Collection.Item>
        <Collection.Item href="/contact">Contact</Collection.Item>
      </Collection>
    </>
  );
};

export default NavigationMenuExample;
