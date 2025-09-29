import React from 'react';
import Collection from '../Collection';
import { MenuContext } from './MenuContext';

// Menu.Option - renders as Collection.Item (selectable menu items)
const MenuOption = ({ value, disabled, children, className = '', ...props }) => {
  const context = React.useContext(MenuContext);
  const { menu } = context || {};

  // Check if this item is selected
  const isSelected = menu?.selectedKeys ? menu.selectedKeys.has(value) : false;

  // Build CSS classes
  const menuItemClass = `menu-item${isSelected ? ' selected' : ''}${disabled ? ' disabled' : ''} ${className}`.trim();

  return (
    <Collection.Item
      key={value}
      role="menuitem"
      aria-disabled={disabled}
      className={menuItemClass}
      {...(menu?.getItemProps ? menu.getItemProps(value) : {})}
      {...props}
    >
      {children}
    </Collection.Item>
  );
};

MenuOption.displayName = 'Menu.Option';

export default MenuOption;