import { useState } from "react";
import Collection from "../../../lib/Collections/Collection";
import { useExpansion } from "../../../lib/Collections/hooks/useExpansion";

const StaticTreeControlledExample = () => {
  // All expandable folder keys - in a real app, extract from data structure
  const expandableFolders = ['documents', 'projects', 'src', 'contracts'];

  // CONTROLLED: Parent component manages the expansion state
  const [expandedItems, setExpandedItems] = useState(new Set());

  // Controlled expansion hook
  const expansion = useExpansion({
    expanded: expandedItems,
    onExpand: (_event, { expanded }) => setExpandedItems(expanded),
    allowMultiple: true,
  });

  const handleItemClick = (event, { key }) => {
    // Prevent event bubbling to avoid triggering parent expansion/collapse
    event?.stopPropagation();
    console.log('Static controlled tree item clicked:', key);
  };

  return (
    <>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "32px", marginBottom: "8px" }}>
        🔹 Static Tree - Controlled
      </h3>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
        Parent component controls expansion state. External state management possible.
      </p>

      {/* Controls */}
      <div style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setExpandedItems(new Set(expandableFolders))}
          style={{
            padding: "6px 12px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Expand All Folders
        </button>
        <button
          onClick={() => setExpandedItems(new Set())}
          style={{
            padding: "6px 12px",
            background: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Collapse All
        </button>
        <button
          onClick={() => setExpandedItems(new Set(['documents']))}
          style={{
            padding: "6px 12px",
            background: "#ffc107",
            color: "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Expand Only Documents
        </button>
      </div>

      <div style={{
        border: "1px solid #28a745",
        borderRadius: "8px",
        padding: "12px",
        background: "#f8fff8"
      }}>
        <Collection
          title="Static Controlled File System"
          ariaLabel="Static controlled collapsible file tree"
          pattern="tree"
          as="ul"
          itemAs="li"
          className="list-unstyled"
        >
          {/* Documents Folder */}
          <Collection.Item
            key="documents"
            {...expansion.getItemProps('documents', {
              hasChildren: true,
              onClick: (e) => handleItemClick(e, { key: 'documents' })
            })}
          >
            {expansion.isExpanded('documents') ? '📂' : '📁'} Documents

            {expansion.isExpanded('documents') && (
              <Collection
                as="ul"
                itemAs="li"
                pattern="tree"
              >
                <Collection.Item
                  key="resume"
                  onClick={(e) => handleItemClick(e, { key: 'resume' })}
                >
                  📄 Resume.pdf
                </Collection.Item>

                <Collection.Item
                  key="contracts"
                  {...expansion.getItemProps('contracts', {
                    hasChildren: true,
                    onClick: (e) => handleItemClick(e, { key: 'contracts' })
                  })}
                >
                  {expansion.isExpanded('contracts') ? '📂' : '📁'} Legal Documents

                  {expansion.isExpanded('contracts') && (
                    <Collection
                      as="ul"
                      itemAs="li"
                      pattern="tree"
                    >
                      <Collection.Item
                        key="contract1"
                        onClick={(e) => handleItemClick(e, { key: 'contract1' })}
                      >
                        📄 Service Agreement.pdf
                      </Collection.Item>
                    </Collection>
                  )}
                </Collection.Item>
              </Collection>
            )}
          </Collection.Item>

          {/* Projects Folder */}
          <Collection.Item
            key="projects"
            {...expansion.getItemProps('projects', {
              hasChildren: true,
              onClick: (e) => handleItemClick(e, { key: 'projects' })
            })}
          >
            {expansion.isExpanded('projects') ? '📂' : '📁'} Projects

            {expansion.isExpanded('projects') && (
              <Collection
                as="ul"
                itemAs="li"
                pattern="tree"
              >
                <Collection.Item
                  key="src"
                  {...expansion.getItemProps('src', {
                    hasChildren: true,
                    onClick: (e) => handleItemClick(e, { key: 'src' })
                  })}
                >
                  {expansion.isExpanded('src') ? '📂' : '📁'} src

                  {expansion.isExpanded('src') && (
                    <Collection
                      as="ul"
                      itemAs="li"
                      pattern="tree"
                    >
                      <Collection.Item
                        key="app"
                        onClick={(e) => handleItemClick(e, { key: 'app' })}
                      >
                        ⚛️ App.jsx
                      </Collection.Item>
                    </Collection>
                  )}
                </Collection.Item>
              </Collection>
            )}
          </Collection.Item>

          {/* README file (not expandable) */}
          <Collection.Item
            key="readme"
            onClick={(e) => handleItemClick(e, { key: 'readme' })}
          >
            📄 README.md
          </Collection.Item>
        </Collection>
      </div>

      {/* Status Display */}
      <div style={{
        marginTop: "16px",
        padding: "12px",
        background: "#d4edda",
        borderRadius: "4px",
        fontSize: "14px"
      }}>
        <strong>Controlled State:</strong> {
          Array.from(expandedItems).join(', ') || 'None'
        }
      </div>
    </>
  );
};

export default StaticTreeControlledExample;