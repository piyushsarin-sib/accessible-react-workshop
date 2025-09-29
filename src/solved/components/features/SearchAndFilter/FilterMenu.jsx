import { useState } from "react";
import Menu from "../../../../lib/Collections/Menu";

const FilterMenu = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const handleChange = (event, { selectedKeys }) => {
    console.log(`Filter menu selection:`, selectedKeys, event);
    setSelectedKeys(selectedKeys);
  };

  return (
    <Menu
      selectedKeys={selectedKeys}
      onChange={handleChange}
      ariaLabel="Product filters menu"
    >
      <Menu.Title>📦 Categories</Menu.Title>
      <Menu.Option value="all-products">All Products</Menu.Option>
      <Menu.Option value="hearing">🦻 Hearing Assistance</Menu.Option>
      <Menu.Option value="vision">👁️ Visual Assistance</Menu.Option>
      <Menu.Option value="mobility">🦽 Mobility Aids</Menu.Option>
      <Menu.Option value="sensory">🤲 Sensory Tools</Menu.Option>

      <Menu.Title>💰 Price Ranges</Menu.Title>
      <Menu.Option value="all-prices">All Prices</Menu.Option>
      <Menu.Option value="under1000">Under ₹1,000</Menu.Option>
      <Menu.Option value="1000-5000">₹1,000 - ₹5,000</Menu.Option>
      <Menu.Option value="above5000">Above ₹5,000</Menu.Option>

      <Menu.Title>⭐ Ratings</Menu.Title>
      <Menu.Option value="5-star">⭐⭐⭐⭐⭐ 5 Star</Menu.Option>
      <Menu.Option value="4-star">⭐⭐⭐⭐ 4 Star & Above</Menu.Option>
      <Menu.Option value="3-star">⭐⭐⭐ 3 Star & Above</Menu.Option>
    </Menu>
  );
};

export default FilterMenu;
