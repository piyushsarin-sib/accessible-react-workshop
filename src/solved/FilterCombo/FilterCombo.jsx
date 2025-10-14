import React, { useState } from "react";
import { PLACEMENTS } from "@solved/lib/Overlay";
import Button from "@common/Button";
import ComboBox from "@solved/lib/Menu/ComboBox";
import { useComboBox } from "@solved/lib/Menu/useComboBox";

const categories = [
  { id: "hearing", name: "Hearing Assistance" },
  { id: "vision", name: "Visual Assistance" },
  { id: "mobility", name: "Mobility Aids" },
  { id: "sensory", name: "Sensory Tools" },
];

// Price ranges for filtering
const priceRanges = [
  { id: "under1000", name: "Under ₹1,000" },
  { id: "1000-5000", name: "₹1,000 - ₹5,000" },
  { id: "above5000", name: "Above ₹5,000" },
];

const FilterCombo = () => {
  // Hooks must be called first
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // Combine categories and priceRanges into a single items array
  const allItems = [...categories, ...priceRanges];

  // useComboBox hook
  const comboboxState = useComboBox({
    items: allItems,
    overlayConfig: { placement: PLACEMENTS.BOTTOM_START },
    style: { width: "400px" },
    overlayId: "combobox-overlay",
    triggerId: "combobox-overlay-trigger",
    listboxId: "filter-combobox-listbox",
    selectionMode: "single",
    selectedKeys: selectedKeys,
    onChange: (event, { selectedKeys: newSelectedKeys }) => {
      console.log("ComboBox selection changed:", newSelectedKeys);
      setSelectedKeys(Array.from(newSelectedKeys));
      // Close overlay after selection
      comboboxState.close();
    },
    ariaLabel: "Product filters combobox",
  });

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    // Open the menu when user types
    comboboxState.open();
  };

  return (
    <div style={{ padding: "50px" }}>
      <h3 style={{ marginBottom: "20px" }}>ComboBox with Active Descendant (Search Input)</h3>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Type in the search input to filter and use arrow keys to navigate. Focus stays on the input
        while navigating options (aria-activedescendant pattern).
      </p>

      <Button
        variant="secondary"
        onClick={() => console.log("Previous button clicked")}
        style={{ marginRight: "12px" }}
      >
        Previous Button
      </Button>

      <div style={{ display: "inline-block", position: "relative" }}>
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          onClick={comboboxState.toggle}
          placeholder="Search filters..."
          {...comboboxState.trigger}
          style={{
            width: "400px",
            padding: "8px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
            backgroundColor: "white",
            color: "#1f2937",
          }}
          className="accessible-focus"
        />
      </div>

      <ComboBox {...comboboxState}>
        <ComboBox.Title>📦 Categories</ComboBox.Title>
        {categories.map((category) => (
          <ComboBox.Option key={category.id} value={category.id}>
            {category.name}
          </ComboBox.Option>
        ))}

        <ComboBox.Title>💰 Price Ranges</ComboBox.Title>
        {priceRanges.map((price) => (
          <ComboBox.Option key={price.id} value={price.id}>
            {price.name}
          </ComboBox.Option>
        ))}
      </ComboBox>

      <Button
        variant="secondary"
        onClick={() => console.log("Next button clicked")}
        style={{ marginLeft: "12px" }}
      >
        Next Button
      </Button>
    </div>
  );
};

export default FilterCombo;
