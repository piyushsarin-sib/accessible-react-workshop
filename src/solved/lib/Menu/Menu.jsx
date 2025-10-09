import React from "react";
import { Overlay } from "@solved/lib/Overlay";
import MenuList from "./MenuList";
import MenuTitle from "./MenuTitle";
import MenuOption from "./MenuOption";

/**
 * Menu - Menu with overlay by default
 * Consumers should use useMenu hook to get overlay controls,
 * then spread trigger props on their chosen trigger element
 *
 * @example
 * const menuState = useMenu({
 *   overlayConfig: { placement: PLACEMENTS.BOTTOM_START },
 *   style: { width: '250px' }
 * });
 *
 * return (
 *   <>
 *     <Button {...menuState.trigger} onClick={menuState.toggle}>Open Menu</Button>
 *     <Menu {...menuState} onChange={handleChange} ariaLabel="My menu">
 *       <Menu.Option>Item 1</Menu.Option>
 *     </Menu>
 *   </>
 * );
 */
const Menu = ({
  trigger,
  body,
  open,
  close,
  toggle,
  setVisible,
  autoFocus = false,
  closeOnOutsideClick = true,
  children,
  selectedKeys,
  defaultSelectedKeys,
  selectionMode = "single",
  onChange,
  ariaLabel,
  ...props
}) => {
  return (
    /*
      TODO: Wrap Overlay around MenuList

      Props to pass to Overlay:
      - trigger: Trigger element ref and id
      - body: Overlay ref, visibility, placement, styles
      - setVisible: Control overlay visibility
      - close: Close overlay function
      - open: Open overlay function
      - toggle: Toggle overlay function
      - pattern: "menu" (overlay type)
      - autoFocus: false (for menus). you might require eslint-disable-next-line jsx-a11y/no-autofocus
      - closeOnOutsideClick: true (close on outside click)
    */

    <MenuList
      selectedKeys={selectedKeys}
      defaultSelectedKeys={defaultSelectedKeys}
      selectionMode={selectionMode}
      onChange={onChange}
      ariaLabel={ariaLabel}
      close={close}
      open={open}
      toggle={toggle}
      {...props}
    >
      {children}
    </MenuList>
  );
};

// Attach child components for compound component pattern
Menu.Title = MenuTitle;
Menu.Option = MenuOption;
Menu.List = MenuList; // Export MenuList for standalone usage

export default Menu;
