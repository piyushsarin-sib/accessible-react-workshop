import { useState } from "react";
import Menu from "../../../lib/Collections/Menu";

//TODO: MAKE NECESSARY CHANGES TO THE MENU ITEMS TO
const menuItems = [
  // { key: "new", label: "New File", icon: "📄" },
  // { key: "open", label: "Open File", icon: "📁" },
  // { key: "save", label: "Save", icon: "💾" },
  // { key: "export", label: "Export", icon: "📤" },
  // { key: "print", label: "Print", icon: "🖨️" },

  { id: "category_title", name: "Categories", isTitle: true },
  { id: "all-products", name: "All Products" },
  { id: "hearing", name: "Hearing Assistance" },
  { id: "vision", name: "Visual Assistance" },
  { id: "mobility", name: "Mobility Aids" },
  { id: "sensory", name: "Sensory Tools" },

  // prices
  { id: "prices_title", name: "Price Ranges", isTitle: true },
  { id: "all-prices", name: "All Prices" },
  { id: "under1000", name: "Under ₹1,000" },
  { id: "1000-5000", name: "₹1,000 - ₹5,000" },
  { id: "above5000", name: "Above ₹5,000" },
];

const SimpleMenuExample = () => {
  const [selectedKey, setSelectedKey] = useState(null);

  const handleChange = (event, { selectedItems }) => {
    console.log(`Menu selection changed to:`, selectedItems, event);
    setSelectedKey(selectedItems[0]?.id || null);
  };

  // TODO

  return (
    <>
      <Menu
        items={menuItems}
        selectedKey={selectedKey}
        onChange={handleChange}
        ariaLabel="Product filters menu"
        allowDeselect={true}
      />
    </>
  );
};

export default SimpleMenuExample;
