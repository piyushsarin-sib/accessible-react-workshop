import React from "react";
import Collection from "../../../lib/Collections/Collection";
import { useSelection } from "../../../lib/Collections/hooks/useCollectionSelection";
import "./SelectionExample.css";

const menuItems = [
  { key: "new", label: "New File", icon: "📄" },
  { key: "open", label: "Open File", icon: "📁" },
  { key: "save", label: "Save", icon: "💾" },
  { key: "export", label: "Export", icon: "📤" },
  { key: "print", label: "Print", icon: "🖨️" },
];

const SingleSelectionExample = () => {
  console.log('SingleSelectionExample rendering with useSelection hook...');

  // Use the useSelection hook directly
  const selection = useSelection({
    selectionMode: 'single',
    pattern: 'menu',
    label: 'File operations menu',
    onSelect: (event, key, item) => {
      console.log(`Menu item selected via hook: ${key}`, item);
    }
  });

  console.log('Selection state:', {
    selectedKeys: Array.from(selection.selectedKeys),
    selectionMode: selection.selectionMode,
    hasSelection: selection.hasSelection
  });

  try {
    return (
      <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>
          Single Selection Menu (using useSelection hook directly)
        </h3>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
          Click items to select. Only one item can be selected at a time.
        </p>

        <Collection
          as="ul"
          itemAs="li"
          className="selection-menu"
          {...selection.getCollectionAriaProps()}
        >
          {menuItems.map((item) => {
            const isSelected = selection.selectedKeys.has(item.key);
            const itemHandlers = selection.getItemHandlers(item.key, item);
            const itemAriaProps = selection.getItemAriaProps(item.key);
            
            return (
              <Collection.Item
                key={item.key}
                className={`menu-item ${isSelected ? 'selected' : ''}`}
                {...itemHandlers}
                {...itemAriaProps}
              >
                <span className="menu-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="menu-label">{item.label}</span>
                {isSelected && (
                  <span className="selection-indicator" aria-hidden="true">
                    ✓
                  </span>
                )}
              </Collection.Item>
            );
          })}
        </Collection>

        <div style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
          <strong>Selected:</strong>{" "}
          {selection.selectedKeys.size > 0 ? 
            menuItems.find(item => selection.selectedKeys.has(item.key))?.label : 
            "None"
          }
          <br />
          <strong>Hook state:</strong>{" "}
          {selection.selectedKeys.size > 0 ? Array.from(selection.selectedKeys).join(', ') : "None"}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering SingleSelectionExample:', error);
    return (
      <div style={{ padding: "20px", backgroundColor: "red", color: "white" }}>
        <h3>Error in SingleSelectionExample</h3>
        <p>Error: {error.message}</p>
        <p>Check console for details</p>
      </div>
    );
  }
};

export default SingleSelectionExample;
