import React, { useMemo } from "react";
import { useSelection } from "@lib/interactions/selection/useSelection";
import { useActiveDescendant } from "@lib/interactions/keyboard/hooks/useActiveDescendant";

/**
 * Hook for managing combobox state with aria-activedescendant navigation
 * This hook processes children to extract menu items and manages their state
 * using the active descendant pattern where focus stays on the trigger (input)
 *
 * @param {Object} options - Configuration options
 * @param {ReactNode} options.children - Menu JSX children containing Menu.Option components
 * @param {Array<string>} options.selectedKeys - Currently selected keys (controlled mode)
 * @param {Array<string>} options.defaultSelectedKeys - Default selected keys (uncontrolled mode)
 * @param {Function} options.onChange - Selection change handler: (event, { selectedKeys }) => void
 * @param {string} options.ariaLabel - Accessible label for the menu
 * @param {string} options.selectionMode - Selection mode: 'single' or 'multiple'
 * @param {string} options.listboxId - ID for the listbox container (required for aria-activedescendant)
 * @returns {Object} Combobox state with trigger props, collection props and item props getters
 */
export const useComboboxState = ({
  children,
  selectedKeys,
  defaultSelectedKeys,
  onChange,
  ariaLabel,
  selectionMode = "single",
  listboxId = "combobox-listbox",
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

  // Use existing hooks with the processed nodes
  const selection = useSelection({
    selectionMode,
    selectedKeys: selectedKeys !== undefined ? new Set(selectedKeys) : undefined,
    defaultSelectedKeys: defaultSelectedKeys ? new Set(defaultSelectedKeys) : new Set(),
    onChange: (event, { selectedKeys }) => {
      onChange?.(event, { selectedKeys });
    },
    pattern: "menu",
    label: ariaLabel,
  });

  // Use active descendant navigation pattern
  const navigation = useActiveDescendant({
    items: menuNodes,
    orientation: "vertical",
    loop: true,
    defaultActiveKey: menuNodes.length > 0 ? menuNodes[0].key : null,
    listboxId,
  });

  return {
    // Props for the trigger element (input/combobox)
    getTriggerProps: () => ({
      ...navigation.getTriggerProps(),
    }),
    // Props for the listbox container
    getCollectionProps: () => ({
      ...selection.getCollectionAriaProps(),
      ...navigation.getCollectionProps(),
    }),
    // Props for individual items
    getItemProps: (key) => {
      // Find the item data from menuNodes
      const item = menuNodes.find((node) => node.key === key);
      return {
        ...selection.getItemSelectionProps(key, item),
        ...navigation.getItemProps(key),
      };
    },
    selectedKeys: selection.selectedKeys,
    menuNodes,
    navigation, // Expose navigation for additional control if needed
  };
};
