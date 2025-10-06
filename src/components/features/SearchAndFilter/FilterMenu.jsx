import Menu from "../../../lib/Menu";

const FilterMenu = ({ menuState, onChange, categories, priceRanges, selectedKeys }) => {
  return (
    <Menu
      {...menuState}
      onChange={onChange}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      ariaLabel="Product filters menu"
    >
      <Menu.Title>📦 Categories</Menu.Title>
      {categories.map((category) => (
        <Menu.Option key={category.id} value={category.id}>
          {category.name}
        </Menu.Option>
      ))}

      <Menu.Title>💰 Price Ranges</Menu.Title>
      {priceRanges.map((price) => (
        <Menu.Option key={price.id} value={price.id}>
          {price.name}
        </Menu.Option>
      ))}
    </Menu>
  );
};

export default FilterMenu;
