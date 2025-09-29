import React, { useMemo } from 'react';
import { useSelection } from '../hooks/useSelection';
import { useRovingIndex } from '../hooks/useRovingIndex';

/**
 * Hook for managing menu behavior including selection and keyboard navigation
 * @param {Object} options - Configuration options
 * @param {ReactNode} options.children - Menu JSX children containing Menu.Option components
 * @param {Array<string>} options.selectedKeys - Currently selected keys (controlled mode)
 * @param {Array<string>} options.defaultSelectedKeys - Default selected keys (uncontrolled mode)
 * @param {Function} options.onChange - Selection change handler: (event, { selectedKeys }) => void
 * @param {string} options.ariaLabel - Accessible label for the menu
 * @returns {Object} Menu state and prop getters
 */
export const useMenu = ({ children, selectedKeys, defaultSelectedKeys, onChange, ariaLabel }) => {
  // Simple function to extract menu options from children
  const createMenuNodes = (children) => {
    const nodes = [];

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        // Check if it's a Menu.Option by checking displayName or value prop
        const isMenuOption = child.type?.displayName === 'Menu.Option' ||
                            child.props.value !== undefined;

        if (isMenuOption) {
          const key = child.props.value || child.key;
          if (key && !child.props.disabled) {
            nodes.push({
              key,
              value: key,
              label: child.props.children,
              disabled: child.props.disabled || false
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
    selectionMode: 'single',
    selectedKeys: selectedKeys !== undefined ? new Set(selectedKeys) : undefined,
    defaultSelectedKeys: defaultSelectedKeys ? new Set(defaultSelectedKeys) : new Set(),
    onChange: (event, { selectedKeys }) => {
      onChange?.(event, { selectedKeys });
    },
    pattern: 'menu',
    label: ariaLabel
  });

  const navigation = useRovingIndex({
    items: menuNodes,
    orientation: "vertical",
    loop: true,
    defaultActiveKey: menuNodes.length > 0 ? menuNodes[0].key : null
  });

  return {
    getCollectionProps: () => ({
      ...selection.getCollectionAriaProps(),
      ...navigation.getCollectionProps()
    }),
    getItemProps: (key) => ({
      ...selection.getItemHandlers(key),
      ...navigation.getItemProps(key)
    }),
    selectedKeys: selection.selectedKeys,
    menuNodes
  };
};