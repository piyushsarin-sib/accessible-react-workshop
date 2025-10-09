import { useState } from "react";
import Collection from "@lib/Collections/Collection";
import { useSelection } from "@lib/interactions/selection/useSelection";
import "./SelectionExample.css";

const options = [
  { key: "javascript", label: "JavaScript", category: "Language" },
  { key: "react", label: "React", category: "Framework" },
  { key: "vue", label: "Vue.js", category: "Framework" },
  { key: "nodejs", label: "Node.js", category: "Runtime" },
  { key: "typescript", label: "TypeScript", category: "Language" },
  { key: "webpack", label: "Webpack", category: "Tool" },
  { key: "vite", label: "Vite", category: "Tool" },
];

const MultiSelectionExample = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["javascript", "react"]));

  const selection = useSelection({
    pattern: "listbox", // Uses pre-configured listbox pattern
    selectionMode: "multiple", // Use multiple selection mode
    selectedKeys,
    onChange: (event, { selectedKeys: newSelection }) => {
      setSelectedKeys(newSelection);
      // Also log selectedItems for consistency
      const selectedItems = options.filter(option => newSelection.has(option.key));
      console.log('Selected items:', selectedItems);
    },
    label: "Technology selection",
  });

  const getSelectedItems = () => {
    return options.filter((option) => selectedKeys.has(option.key));
  };

  const clearAll = () => {
    setSelectedKeys(new Set());
  };

  const selectAll = () => {
    setSelectedKeys(new Set(options.map((option) => option.key)));
  };

  return (
    <>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>
        Multiple Selection Listbox
      </h3>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
        Select multiple technologies. Use Ctrl+Click or Cmd+Click for multiple selection.
      </p>

      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={selectAll}
          style={{ marginRight: "8px", padding: "4px 8px", fontSize: "12px" }}
        >
          Select All
        </button>
        <button onClick={clearAll} style={{ padding: "4px 8px", fontSize: "12px" }}>
          Clear All
        </button>
      </div>

      <Collection
        as="ul"
        itemAs="li"
        className="selection-listbox"
        {...selection.getCollectionAriaProps()}
      >
        {options.map((option) => {
          const isSelected = selectedKeys.has(option.key);
          const itemHandlers = selection.getItemHandlers(option.key, option);
          const ariaProps = selection.getItemAriaProps(option.key);

          return (
            <Collection.Item
              key={option.key}
              className={`listbox-option ${isSelected ? "selected" : ""}`}
              {...itemHandlers}
              {...ariaProps}
            >
              <div className="option-content">
                <span className="option-label">{option.label}</span>
                <span className="option-category">{option.category}</span>
              </div>
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
        <strong>Selected ({selectedKeys.size}):</strong>
        {selectedKeys.size > 0 ? (
          <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
            {getSelectedItems().map((item) => (
              <li key={item.key}>
                {item.label} ({item.category})
              </li>
            ))}
          </ul>
        ) : (
          <span> None</span>
        )}
      </div>
    </>
  );
};

export default MultiSelectionExample;
