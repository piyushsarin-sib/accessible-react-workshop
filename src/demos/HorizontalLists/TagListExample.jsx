import Collection from "../../lib/Collections/Collection";
import "./HorizontalListExample.css";

const tagData = [
  { id: 'react', name: 'React', color: '#61DAFB', category: 'frontend' },
  { id: 'javascript', name: 'JavaScript', color: '#F7DF1E', category: 'language' },
  { id: 'css', name: 'CSS', color: '#1572B6', category: 'styling' },
  { id: 'html', name: 'HTML', color: '#E34F26', category: 'markup' },
  { id: 'accessibility', name: 'Accessibility', color: '#4A90E2', category: 'ux' },
  { id: 'typescript', name: 'TypeScript', color: '#3178C6', category: 'language' },
  { id: 'nodejs', name: 'Node.js', color: '#339933', category: 'backend' },
  { id: 'webpack', name: 'Webpack', color: '#8DD6F9', category: 'tooling' },
];

const TagListExample = () => {
  return (
    <>
      <h3 style={{ fontSize: "16px", fontWeight: "bold", marginTop: "24px", marginBottom: "12px" }}>
        Tag List (Dynamic Collection)
      </h3>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
        Dynamic collection rendering technology tags with colors and categories
      </p>
      <Collection 
        as="div" 
        itemAs="span" 
        className="horizontal-tags" 
        itemClassName="tag-item"
        role="list"
        ariaLabel="Technology tags with categories"
        items={tagData}
      >
        {(tag) => (
          <span 
            style={{ 
              backgroundColor: tag.color,
              color: '#fff',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500'
            }}
            title={`${tag.name} - ${tag.category}`}
          >
            {tag.name}
          </span>
        )}
      </Collection>
    </>
  );
};

export default TagListExample;
