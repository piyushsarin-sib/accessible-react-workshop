import React from 'react';
import Collection from './Collection';
import { useSelection } from './hooks/useCollectionSelection';

const Menu = ({
  items = [],
  onSelect,
  defaultSelection = null,
  allowDeselect = true,
  className = 'selection-menu',
  ariaLabel,
  children,
  renderItem,
  ...props
}) => {
  console.log('Menu component rendering with:', { 
    itemsLength: items.length, 
    hasChildren: !!children, 
    ariaLabel, 
    className 
  });
  
  // Convert selection to key for useSelection hook
  const getSelectionKey = (selection) => {
    if (!selection) return null;
    return typeof selection === 'object' ? selection.key || selection.id : selection;
  };
  
  const defaultSelectionKey = getSelectionKey(defaultSelection);
  const initialSelectionSet = defaultSelectionKey ? new Set([defaultSelectionKey]) : new Set();

  const {
    selectedKeys,
    getItemHandlers,
    getCollectionAriaProps
  } = useSelection({
    selectionMode: 'single',
    initialSelection: initialSelectionSet,
    pattern: 'menu',
    label: ariaLabel,
    onClick: (event, key) => {
      // Custom selection logic for deselection and blur
      const isCurrentlySelected = selectedKeys.has(key);
      const shouldDeselect = isCurrentlySelected && allowDeselect;
      
      // If deselecting, blur the element to remove focus styling
      if (shouldDeselect && event?.target) {
        event.target.blur();
      }
      
      // Find the selected item object
      const selectedItem = items.find(item => 
        (item.key || item.id) === key
      ) || { key };
      
      // Notify parent of selection change
      const finalSelection = shouldDeselect ? null : selectedItem;
      onSelect?.(finalSelection, key, event);
    }
  });

  // Get current selected key for backward compatibility
  const selectedKey = selectedKeys.size > 0 ? [...selectedKeys][0] : null;

  // If using children pattern (JSX)
  if (children) {
    return (
      <Collection
        as="ul"
        itemAs="li"
        className={className}
        {...getCollectionAriaProps()}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === Menu.Item) {
            const key = child.props.itemKey || child.key || index;
            const isSelected = selectedKey === key;
            const itemHandlers = getItemHandlers(key, child.props);
            
            return (
              <Collection.Item
                key={key}
                className={`menu-item ${child.props.isEmpty ? 'empty-item' : ''} ${isSelected ? 'selected' : ''}`}
                data-selected={isSelected}
                {...itemHandlers}
              >
                {child.props.children}
                {isSelected && (
                  <span className="selection-indicator" aria-hidden="true">
                    ✓
                  </span>
                )}
              </Collection.Item>
            );
          }
          return child;
        })}
      </Collection>
    );
  }

  // If using items array pattern
  return (
    <Collection
      as="ul"
      itemAs="li"
      className={className}
      {...getCollectionAriaProps()}
      {...props}
    >
      {items.map((item, index) => {
        const key = item.key || item.id || index;
        const isSelected = selectedKey === key;
        const itemHandlers = getItemHandlers(key, item);
        
        return (
          <Collection.Item
            key={key}
            className={`menu-item ${item.isEmpty ? 'empty-item' : ''} ${isSelected ? 'selected' : ''}`}
            data-selected={isSelected}
            {...itemHandlers}
          >
            {renderItem ? renderItem(item, isSelected) : (
              <>
                {item.icon && (
                  <span className="menu-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                <span className="menu-label">
                  {item.label || item.placeholder || item.name || ''}
                </span>
                {isSelected && (
                  <span className="selection-indicator" aria-hidden="true">
                    ✓
                  </span>
                )}
              </>
            )}
          </Collection.Item>
        );
      })}
    </Collection>
  );
};

// Menu.Item component for JSX pattern
Menu.Item = () => {
  // This is just a placeholder component
  // The actual rendering is handled by the parent Menu component
  return null;
};

export default Menu;