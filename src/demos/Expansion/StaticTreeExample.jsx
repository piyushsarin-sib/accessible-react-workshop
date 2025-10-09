import Collection from "@lib/Collections/Collection";
import { useExpansion } from "@lib/interactions/expansion/useExpansion";
import { useRovingIndex } from "@lib/interactions/keyboard/hooks/useRovingIndex";

const StaticTreeExample = () => {
  // All expandable folder keys - in a real app, extract from data structure
  const expandableFolders = ['documents', 'projects', 'src', 'contracts'];

  // Initialize expansion state - start collapsed
  const expansion = useExpansion({
    defaultExpanded: new Set(),
    allowMultiple: true,
  });

  // Get all visible tree items for keyboard navigation
  const getVisibleStaticTreeItems = () => {
    const items = [
      { key: 'documents', name: 'Documents', level: 0 }
    ];

    if (expansion.isExpanded('documents')) {
      items.push({ key: 'resume', name: 'Resume.pdf', level: 1 });
      items.push({ key: 'contracts', name: 'Legal Documents', level: 1 });

      if (expansion.isExpanded('contracts')) {
        items.push({ key: 'contract1', name: 'Service Agreement.pdf', level: 2 });
      }
    }

    items.push({ key: 'projects', name: 'Projects', level: 0 });

    if (expansion.isExpanded('projects')) {
      items.push({ key: 'src', name: 'src', level: 1 });

      if (expansion.isExpanded('src')) {
        items.push({ key: 'app', name: 'App.jsx', level: 2 });
      }
    }

    items.push({ key: 'readme', name: 'README.md', level: 0 });

    return items;
  };

  const visibleItems = getVisibleStaticTreeItems();

  // Tree keyboard navigation (vertical only - left/right for expand/collapse)
  const treeNav = useRovingIndex({
    items: visibleItems,
    orientation: "vertical", // Only up/down navigation
    defaultActiveKey: visibleItems.length > 0 ? visibleItems[0].key : null,
  });

  const handleItemClick = (event) => {
    // Prevent event bubbling to avoid triggering parent expansion/collapse
    event?.stopPropagation();
  };

  return (
    <>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "32px", marginBottom: "8px" }}>
        🔸 Static Tree - Uncontrolled
      </h3>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
        Hook manages expansion state internally. Tree structure hardcoded in JSX.
        <strong>Keyboard:</strong> ↑↓ navigate, Enter/Space expand/collapse folders, ←→ reserved for expand/collapse.
      </p>

      {/* Controls */}
      <div style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => expansion.expandAll(expandableFolders)}
          style={{
            padding: "6px 12px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Expand All Folders
        </button>
        <button
          onClick={() => expansion.collapseAll()}
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
      </div>

      <div style={{
        border: "1px solid #007bff",
        borderRadius: "8px",
        padding: "12px",
        background: "#f8f9ff"
      }}>
        <Collection
          title="Static File System"
          ariaLabel="Static collapsible file tree"
          pattern="tree"
          as="ul"
          itemAs="li"
          className="list-unstyled"
          {...treeNav.getCollectionProps()}
        >
          {/* Documents Folder */}
          <Collection.Item
            key="documents"
            {...expansion.getItemProps('documents', {
              hasChildren: true,
              onClick: (e) => handleItemClick(e)
            })}
            {...treeNav.getItemProps('documents')}
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
                  onClick={(e) => handleItemClick(e)}
                  {...treeNav.getItemProps('resume')}
                >
                  📄 Resume.pdf
                </Collection.Item>

                <Collection.Item
                  key="contracts"
                  {...expansion.getItemProps('contracts', {
                    hasChildren: true,
                    onClick: (e) => handleItemClick(e)
                  })}
                  {...treeNav.getItemProps('contracts')}
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
                        onClick={(e) => handleItemClick(e)}
                        {...treeNav.getItemProps('contract1')}
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
              onClick: (e) => handleItemClick(e)
            })}
            {...treeNav.getItemProps('projects')}
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
                    onClick: (e) => handleItemClick(e)
                  })}
                  {...treeNav.getItemProps('src')}
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
                        onClick={(e) => handleItemClick(e)}
                        {...treeNav.getItemProps('app')}
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
            onClick={(e) => handleItemClick(e)}
            {...treeNav.getItemProps('readme')}
          >
            📄 README.md
          </Collection.Item>
        </Collection>
      </div>

      {/* Status Display */}
      <div style={{
        marginTop: "16px",
        padding: "12px",
        background: "#cce5ff",
        borderRadius: "4px",
        fontSize: "14px"
      }}>
        <strong>Static Tree Expanded:</strong> {
          Array.from(expansion.expanded).join(', ') || 'None'
        }
      </div>
    </>
  );
};

export default StaticTreeExample;