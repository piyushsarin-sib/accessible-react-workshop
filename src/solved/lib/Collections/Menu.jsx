import React from 'react';
import Collection from './Collection';
import { useSelection } from './hooks/useSelection';
import '../../demos/Collections/Selection/SelectionExample.css';

// Context to provide selection handlers to nested Menu components
const MenuContext = React.createContext(null);

const Menu = ({
  selectedKey,
  onChange,
  defaultSelectedKey = null,
  className = 'selection-menu',
  ariaLabel,
  children,
  ...props
}) => {

  const defaultSelectionSet = defaultSelectedKey ? new Set([defaultSelectedKey]) : new Set();

  // Convert single key to Set for controlled mode
  const controlledSelectionSet = selectedKey ? new Set([selectedKey]) : new Set();

  // Create a helper to build selectedItems from children (including nested)
  const buildSelectedItems = (newSelection) => {
    const childrenItems = [];

    const collectOptions = (children) => {
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === Menu.Option) {
          const key = child.props.value || child.key;
          if (key) {
            childrenItems.push({
              key,
              value: key,
              label: child.props.children,
              ...child.props
            });
          }
          // Also collect nested options
          if (child.props.children) {
            const childArray = React.Children.toArray(child.props.children);
            const nestedOptions = childArray.filter(c =>
              React.isValidElement(c) && c.type === Menu.Option
            );
            if (nestedOptions.length > 0) {
              collectOptions(nestedOptions);
            }
          }
        }
      });
    };

    collectOptions(children);

    return Array.from(newSelection)
      .map(key => childrenItems.find(item => item.key === key || item.value === key))
      .filter(Boolean);
  };

  const {
    selectedKeys,
    getItemHandlers,
    getCollectionAriaProps
  } = useSelection({
    selectionMode: 'single',
    selectedKeys: selectedKey !== undefined ? controlledSelectionSet : undefined,
    onChange: (event, { selectedKeys: newSelection }) => {
      // Build selected items and call onChange callback
      const selectedItems = newSelection.size === 0 ? [] : buildSelectedItems(newSelection);
      onChange?.(event, { selectedItems });
    },
    defaultSelectedKeys: defaultSelectionSet,
    pattern: 'menu',
    label: ariaLabel
  });

  return (
    <MenuContext.Provider value={{ getItemHandlers, selectedKeys }}>
      <Collection
        as="ul"
        itemAs="li"
        className={className}
        autoIndent={true}
        indentSize={24}
        getItemHandlers={getItemHandlers}
        selectedKeys={selectedKeys}
        {...getCollectionAriaProps()}
        {...props}
      >
        {children}
      </Collection>
    </MenuContext.Provider>
  );
};

// Menu component definitions for JSX pattern

// Menu.Title - renders as Collection.Title (non-selectable section headers)
const MenuTitle = ({ children, className = '', ...props }) => {
  const titleClass = `menu-item title-item ${className}`.trim();
  return <Collection.Title className={titleClass} {...props}>{children}</Collection.Title>;
};

Menu.Title = MenuTitle;

// Menu.Option - renders as Collection.Item (selectable menu items)
const MenuOption = ({ value, disabled, children, className = '', ...props }) => {
  const context = React.useContext(MenuContext);
  const { getItemHandlers, selectedKeys } = context || {};

  // Check if this item is selected
  const isSelected = selectedKeys ? selectedKeys.has(value) : false;

  // Get selection handlers for this item
  const itemData = { value, disabled, children, ...props };
  const handlers = getItemHandlers ? getItemHandlers(value, itemData) : {};

  // Build CSS classes
  const menuItemClass = `menu-item${isSelected ? ' selected' : ''}${disabled ? ' disabled' : ''} ${className}`.trim();

  // Check if children contain nested Menu.Option components
  const childArray = React.Children.toArray(children);
  const hasNestedOptions = childArray.some(child =>
    React.isValidElement(child) && child.type === Menu.Option
  );

  if (hasNestedOptions) {
    // Separate content from nested options
    const content = childArray.filter(child =>
      !React.isValidElement(child) || child.type !== Menu.Option
    );
    const nestedOptions = childArray.filter(child =>
      React.isValidElement(child) && child.type === Menu.Option
    );

    return (
      <Collection.Item
        key={value}
        role="menuitem"
        aria-disabled={disabled}
        aria-expanded="true"
        className={menuItemClass}
        {...handlers}
        {...props}
      >
        {content}
        <Collection
          as="ul"
          itemAs="li"
          role="menu"
          autoIndent={true}
          indentSize={24}
          getItemHandlers={getItemHandlers}
          selectedKeys={selectedKeys}
          _isNestedInItem={true}
          level={2}
        >
          {nestedOptions}
        </Collection>
      </Collection.Item>
    );
  }

  return (
    <Collection.Item
      key={value}
      role="menuitem"
      aria-disabled={disabled}
      className={menuItemClass}
      {...handlers}
      {...props}
    >
      {children}
    </Collection.Item>
  );
};

Menu.Option = MenuOption;



export default Menu;