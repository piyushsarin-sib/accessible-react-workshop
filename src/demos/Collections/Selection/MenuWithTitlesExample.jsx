import { useState } from "react";
import Menu from "../../../lib/Collections/Menu";

const menuItems = [
  // File Operations Section
  { key: "file-title", label: "📁 File Operations", isTitle: true },
  { key: "new", label: "New File", icon: "📄" },
  { key: "open", label: "Open File", icon: "📁" },
  { key: "save", label: "Save", icon: "💾" },

  // Recent Files Section
  { key: "recent-title", label: "📋 Recent Files", isTitle: true },
  { key: "doc1", label: "Document1.txt" },
  { key: "doc2", label: "Presentation.pptx" },
  { key: "doc3", label: "Spreadsheet.xlsx" },

  // Edit Operations Section
  { key: "edit-title", label: "✏️ Edit Operations", isTitle: true },
  { key: "undo", label: "Undo", icon: "↶" },
  { key: "redo", label: "Redo", icon: "↷" },
  { key: "cut", label: "Cut", icon: "✂️" },
  { key: "copy", label: "Copy", icon: "📋" },
  { key: "paste", label: "Paste", icon: "📄" }
];

const MenuWithTitlesExample = () => {
  const [selectedKey, setSelectedKey] = useState(null);

  const handleMenuChange = (event, { selectedItems }) => {
    console.log(`Menu selection changed:`, selectedItems, event);
    // Filter out title items (isTitle: true) from selection
    const selectableItems = selectedItems.filter(item => !item.isTitle);
    setSelectedKey(selectableItems[0]?.key || null);
  };

  return (
    <>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "32px", marginBottom: "16px" }}>
        Menu with Title
      </h3>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
        Menu component with title prop - non-interactive with proper accessibility.
      </p>

      <Menu
        title="🔧 Application Menu"
        items={menuItems}
        selectedKey={selectedKey}
        onChange={handleMenuChange}
        ariaLabel="Application menu with file and edit operations"
        allowDeselect={true}
      />

      <p style={{ fontSize: "12px", color: "#999", marginTop: "8px" }}>
        Note: The title "🔧 Application Menu" should appear above the menu items.
      </p>

      <div style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
        <strong>Selected:</strong> {selectedKey || "None"}
      </div>
    </>
  );
};

export default MenuWithTitlesExample;