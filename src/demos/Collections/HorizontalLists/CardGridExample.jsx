import Collection from "../../../lib/Collections/Collection";
import "./HorizontalListExample.css";

const CardGridExample = () => {
  return (
    <>
      <h3 style={{ fontSize: "16px", fontWeight: "bold", marginTop: "24px", marginBottom: "12px" }}>
        Card Grid
      </h3>
      <Collection 
        as="div" 
        itemAs="article" 
        className="horizontal-cards" 
        itemClassName="card-item"
        pattern="grid"
        ariaLabel="Card grid"
      >
        <Collection.Item>
          <h4>Card 1</h4>
          <p>This is the first card</p>
        </Collection.Item>
        <Collection.Item>
          <h4>Card 2</h4>
          <p>This is the second card</p>
        </Collection.Item>
        <Collection.Item>
          <h4>Card 3</h4>
          <p>This is the third card</p>
        </Collection.Item>
      </Collection>
    </>
  );
};

export default CardGridExample;
