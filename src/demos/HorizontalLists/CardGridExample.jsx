import Collection from "@lib/Collections/Collection";
import "./HorizontalListExample.css";

const cardData = [
  { id: 1, title: "React Fundamentals", description: "Learn the basics of React components, state, and props", category: "Frontend", difficulty: "Beginner" },
  { id: 2, title: "JavaScript ES6+", description: "Modern JavaScript features and best practices", category: "Language", difficulty: "Intermediate" },
  { id: 3, title: "CSS Grid Layout", description: "Master CSS Grid for complex layouts", category: "Styling", difficulty: "Intermediate" },
  { id: 4, title: "Node.js Backend", description: "Building REST APIs with Node.js and Express", category: "Backend", difficulty: "Advanced" },
  { id: 5, title: "TypeScript Basics", description: "Type-safe JavaScript development", category: "Language", difficulty: "Beginner" },
  { id: 6, title: "Accessibility Guide", description: "Creating inclusive web applications", category: "UX", difficulty: "Intermediate" },
  { id: 7, title: "Testing with Jest", description: "Unit and integration testing strategies", category: "Testing", difficulty: "Advanced" },
  { id: 8, title: "Redux State Management", description: "Predictable state container for JavaScript apps", category: "Frontend", difficulty: "Advanced" },
];

const CardGridExample = () => {
  return (
    <>
      <h3 style={{ fontSize: "16px", fontWeight: "bold", marginTop: "24px", marginBottom: "12px" }}>
        Card Grid (Dynamic Collection)
      </h3>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
        Dynamic collection rendering cards from data array with 2D grid layout
      </p>
      <Collection 
        as="div" 
        itemAs="article" 
        className="horizontal-cards" 
        itemClassName="card-item"
        pattern="grid"
        ariaLabel="Learning resource cards"
        items={cardData}
      >
        {(card) => (
          <>
            <div className="card-header">
              <h4>{card.title}</h4>
              <span className={`difficulty-badge ${card.difficulty.toLowerCase()}`}>
                {card.difficulty}
              </span>
            </div>
            <p className="card-description">{card.description}</p>
            <div className="card-footer">
              <span className="card-category">{card.category}</span>
            </div>
          </>
        )}
      </Collection>
    </>
  );
};

export default CardGridExample;
