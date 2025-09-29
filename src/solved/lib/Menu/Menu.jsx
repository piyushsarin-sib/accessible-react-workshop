import Collection from '../Collections/Collection';
import { useMenu } from './useMenu';
import MenuTitle from './MenuTitle';
import MenuOption from './MenuOption';
import { MenuContext } from './MenuContext';
import '../../../demos/Selection/SelectionExample.css';

const Menu = ({
  selectedKeys,
  onChange,
  defaultSelectedKeys = [],
  className = 'selection-menu',
  ariaLabel,
  children,
  ...props
}) => {
  // Use the new useMenu hook for all menu logic
  const menu = useMenu({
    children,
    selectedKeys,
    defaultSelectedKeys,
    onChange,
    ariaLabel
  });

  return (
    <MenuContext.Provider value={{ menu }}>
      <Collection
        as="ul"
        itemAs="li"
        className={className}
        autoIndent={true}
        indentSize={24}
        {...menu.getCollectionProps()}
        {...props}
      >
        {children}
      </Collection>
    </MenuContext.Provider>
  );
};

// Attach child components for compound component pattern
Menu.Title = MenuTitle;
Menu.Option = MenuOption;

export default Menu;