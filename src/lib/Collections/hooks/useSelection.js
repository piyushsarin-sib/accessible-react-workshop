import { useState, useCallback } from "react";
import { useCollectionAria } from "./useCollectionAria";

/**
 * Hook for managing collection item selection
 * @param {Object} options - Configuration options
 * @param {string} options.selectionMode - 'none', 'single', or 'multiple'
 * @param {Set} options.selectedKeys - Controlled selected keys (controlled mode)
 * @param {Function} options.onChange - Controlled selection change handler
 * @param {Set} options.defaultSelectedKeys - Default selected items (uncontrolled mode)
 * @param {string} options.role - Collection role for proper ARIA attributes
 * @param {string} options.pattern - Pre-configured pattern ('listbox', 'menu', 'tabs', 'tree', 'radiogroup')
 * @param {string} options.label - Accessible label for the collection
 * @param {Function} options.onClick - Custom click handler called after selection
 * @param {Function} options.onSelect - Alternative name for onClick (maps to onClick internally)
 * @param {Function} options.onKeyDown - Custom keydown handler called after selection
 * @returns {Object} Selection state and handlers
 */
export const useSelection = ({
  selectionMode = "none",
  selectedKeys: controlledSelectedKeys,
  onChange,
  defaultSelectedKeys = new Set(),
  role,
  pattern,
  label,
  onClick,
  onSelect,
  onKeyDown,
} = {}) => {
  // Map onSelect to onClick for backward compatibility
  const handleClick = onSelect || onClick;

  // Determine if we're in controlled or uncontrolled mode
  const isControlled = controlledSelectedKeys !== undefined;

  // Internal state for uncontrolled mode
  const [internalSelectedKeys, setInternalSelectedKeys] = useState(defaultSelectedKeys);

  // Use controlled or uncontrolled state
  const selectedKeys = isControlled ? controlledSelectedKeys : internalSelectedKeys;
  const setSelectedKeys = isControlled ? onChange : setInternalSelectedKeys;

  // Initialize ARIA hook for proper selection attributes
  const aria = useCollectionAria({
    role,
    selectionMode: selectionMode !== "none" ? selectionMode : undefined,
    selectedKeys,
    label,
  });

  // Get pattern configuration if provided (from the single aria hook)
  const patternConfig = pattern ? aria.getCollectionPattern(pattern) : {};

  const handleSelection = useCallback(
    (event, { key }) => {
      if (selectionMode === "none") return;

      let newSelection = new Set(selectedKeys);

      if (selectionMode === "single") {
        // Single selection - replace current selection
        newSelection = selectedKeys.has(key) ? new Set() : new Set([key]);
      } else if (selectionMode === "multiple") {
        // Multiple selection - toggle item
        if (newSelection.has(key)) {
          newSelection.delete(key);
        } else {
          newSelection.add(key);
        }
      }

      // Call onChange with event first, then selection data
      if (isControlled && onChange) {
        onChange(event, { selectedKeys: newSelection });
      } else {
        setSelectedKeys(newSelection);
      }
    },
    // setSelectedKeys is intentionally omitted - it's either onChange (controlled) or setState (uncontrolled)
    // Adding it would cause unnecessary re-renders when consumers don't memoize onChange
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedKeys, selectionMode],
  );

  // Separate handlers from ARIA props
  const getItemHandlers = useCallback(
    (key, item) => {
      if (selectionMode === "none") return {};

      return {
        onClick: (e) => {
          e.preventDefault();
          handleSelection(e, { key });
          handleClick?.(e, { key, item });
        },
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleSelection(e, { key });
            handleClick?.(e, { key, item });
          } else {
            onKeyDown?.(e, { key, item });
          }
        },
        tabIndex: 0,
      };
    },
    [selectionMode, handleSelection, handleClick, onKeyDown],
  );

  const getItemAriaProps = useCallback(
    (key, options = {}) => {
      if (selectionMode === "none") return {};

      const isSelected = selectedKeys.has(key);

      // Get ARIA props from the aria hook
      return aria.getItemAriaProps(key, {
        ...options,
        selected: isSelected,
      });
    },
    [selectedKeys, selectionMode, aria],
  );

  // Combined props (backward compatibility)
  const getItemSelectionProps = useCallback(
    (key, item, options = {}) => {
      return {
        ...getItemHandlers(key, item),
        ...getItemAriaProps(key, options),
        "data-selected": selectedKeys.has(key),
      };
    },
    [getItemHandlers, getItemAriaProps, selectedKeys],
  );

  const clearSelection = useCallback(() => {
    const newSelection = new Set();
    setSelectedKeys(newSelection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // setSelectedKeys omitted for controlled/uncontrolled pattern

  const selectAll = useCallback(
    (allKeys) => {
      if (selectionMode !== "multiple") return;

      const newSelection = new Set(allKeys);
      setSelectedKeys(newSelection);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectionMode], // setSelectedKeys omitted for controlled/uncontrolled pattern
  );

  const isSelected = useCallback((key) => selectedKeys.has(key), [selectedKeys]);

  // Helper methods for easier access
  const toggleSelection = useCallback(
    (event, { key }) => {
      handleSelection(event, { key });
    },
    [handleSelection],
  );

  const replaceSelection = useCallback((key) => {
    const newSelection = new Set([key]);
    setSelectedKeys(newSelection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // setSelectedKeys omitted for controlled/uncontrolled pattern

  return {
    selectedKeys,
    selectionMode,
    isSelected,
    // Separate handlers and ARIA props
    getItemHandlers,
    getItemAriaProps,
    // Combined props (backward compatibility)
    getItemSelectionProps,
    // Selection methods
    clearSelection,
    selectAll,
    toggleSelection,
    replaceSelection,
    // Selection state
    hasSelection: selectedKeys.size > 0,
    selectionCount: selectedKeys.size,
    // Collection ARIA props
    getCollectionAriaProps: aria.getCollectionAriaProps,
    // Pattern configuration (useful for components)
    patternConfig,
  };
};
