import React, { useMemo } from "react";

/**
 * Hook for managing combobox state
 * This hook processes children to extract menu items
 *
 * @param {Object} options - Configuration options
 * @param {ReactNode} options.children - Menu JSX children containing Menu.Option components
 * @param {string} options.listboxId - ID for the listbox container
 * @param {Object} options.navigation - Navigation object from useActiveDescendant (from useComboBox)
 * @param {Object} options.selection - Selection object from useSelection (from useComboBox)
 * @returns {Object} Combobox state with collection props and item props getters
 */
export const useComboboxState = ({
  children,
  listboxId = "combobox-listbox",
  navigation,
  selection,
}) => {
  // Simple function to extract menu options from children
  const createMenuNodes = (children) => {
    const nodes = [];

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        // Check if it's a Menu.Option by checking displayName or value prop
        const isMenuOption =
          child.type?.displayName === "Menu.Option" || child.props.value !== undefined;

        if (isMenuOption) {
          const key = child.props.value || child.key;
          if (key && !child.props.disabled) {
            nodes.push({
              key,
              value: key,
              label: child.props.children,
              disabled: child.props.disabled || false,
            });
          }
        }
      }
    });

    return nodes;
  };

  const menuNodes = useMemo(() => createMenuNodes(children), [children]);

  return {
    // Props for the listbox container
    getCollectionProps: () => ({
      ...selection.getCollectionAriaProps(),
      ...(navigation ? navigation.getCollectionProps() : { id: listboxId }),
    }),
    // Props for individual items
    getItemProps: (key) => {
      // Find the item data from menuNodes
      const item = menuNodes.find((node) => node.key === key);
      return {
        ...selection.getItemSelectionProps(key, item),
        ...(navigation ? navigation.getItemProps(key) : {}),
      };
    },
    selectedKeys: selection.selectedKeys,
    menuNodes,
    listboxId,
  };
};
