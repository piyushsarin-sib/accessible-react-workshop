/* eslint-disable */

import React from "react";
import Collection from "@lib/Collections/Collection";
import { useComboboxState } from "./hooks/useComboboxState";
import MenuTitle from "./MenuTitle";
import MenuOption from "./MenuOption";
import { MenuContext } from "./MenuContext";
import "@demo/Selection/SelectionExample.css";

/**
 * ComboBoxList - Standalone combobox component using aria-activedescendant
 * Use this when focus should remain on the trigger (e.g., search input)
 */
const ComboBoxList = ({
  selectedKeys,
  onChange,
  defaultSelectedKeys = [],
  selectionMode = "single",
  className = "selection-menu",
  ariaLabel,
  children,
  close,
  open,
  toggle,
  listboxId = "combobox-listbox",
  activeKey,
  setActiveKey,
  keyboardHandlerRef,
  ...props
}) => {
  // Use useComboboxState hook for combobox logic (children processing, keyboard nav)
  const combobox = useComboboxState({
    children,
    selectedKeys,
    defaultSelectedKeys,
    onChange,
    ariaLabel,
    selectionMode,
    listboxId,
  });

  // Sync activeKey changes from keyboard navigation to parent
  // When combobox navigation changes activeKey, update the parent's activeKey
  React.useEffect(() => {
    if (combobox.navigation?.activeKey !== undefined && setActiveKey) {
      setActiveKey(combobox.navigation.activeKey);
    }
  }, [combobox.navigation?.activeKey, setActiveKey]);

  // Set the keyboard handler in the ref so the input can use it
  React.useEffect(() => {
    if (keyboardHandlerRef && combobox.navigation?.handleKeyDown) {
      keyboardHandlerRef.current = combobox.navigation.handleKeyDown;
    }
  }, [keyboardHandlerRef, combobox.navigation]);

  return (
    <MenuContext.Provider value={{ menu: combobox, close, open, toggle }}>
      <Collection
        as="ul"
        itemAs="li"
        className={className}
        autoIndent={true}
        indentSize={24}
        {...combobox.getCollectionProps()}
        {...props}
      >
        {children}
      </Collection>
    </MenuContext.Provider>
  );
};

// Attach child components for compound component pattern
ComboBoxList.Title = MenuTitle;
ComboBoxList.Option = MenuOption;

export default ComboBoxList;
