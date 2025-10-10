import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useCollectionAria } from "../../../Collections/hooks/useCollectionAria";
import { createNavigationDelegate } from "../delegates/index.js";
import { createKeyboardDelegate } from "../utils/keyboardPrimitives.js";

/**
 * Hook for managing aria-activedescendant keyboard navigation
 * In this pattern, focus stays on the composite widget (e.g., input, combobox)
 * while aria-activedescendant points to the currently active descendant element
 *
 * This is ideal for:
 * - Comboboxes with search input
 * - Autocomplete widgets
 * - Any pattern where the trigger needs to maintain focus
 *
 * @param {Object} options - Configuration options
 * @param {Array} options.items - Array of items or keys to navigate through
 * @param {('vertical'|'horizontal'|'both')} options.orientation - Navigation orientation
 * @param {number|string} [options.defaultActiveKey=null] - Initially active item key/index
 * @param {Function} [options.onActiveChange] - Callback when active item changes: (newKey, oldKey) => void
 * @param {boolean} [options.loop=true] - Whether to loop at collection boundaries
 * @param {boolean} [options.disabled=false] - Whether navigation is disabled
 * @param {string} [options.role] - ARIA role for collection
 * @param {string} [options.pattern] - Collection pattern for ARIA
 * @param {string} [options.label] - Accessible label
 * @param {string} [options.labelledBy] - ID of element that labels collection
 * @param {string} [options.describedBy] - ID of element that describes collection
 * @param {string} [options.listboxId] - ID for the listbox container (required for aria-activedescendant)
 *
 * @returns {Object} Navigation state and methods
 */
export const useActiveDescendant = ({
  items = [],
  orientation = "vertical",
  columnsCount = 1,
  defaultActiveKey = null,
  onActiveChange,
  loop = true,
  disabled = false,
  // ARIA configuration
  role,
  pattern,
  label,
  labelledBy,
  describedBy,
  listboxId,
} = {}) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);
  const itemRefs = useRef(new Map()); // Map to store element refs: key -> element

  // Use existing ARIA hook for proper collection attributes
  const aria = useCollectionAria({
    role,
    pattern,
    orientation: orientation === "both" ? "vertical" : orientation,
    label,
    labelledBy,
    describedBy,
  });

  // Convert items to array of keys/indices if needed
  const itemKeys = useMemo(() => {
    if (!items.length) return [];

    return items.map((item, index) => {
      // Handle different item formats
      if (typeof item === "object" && item !== null) {
        return item.key || item.id || index;
      }
      return item || index;
    });
  }, [items]);

  const totalItems = itemKeys.length;
  const rowsCount = Math.ceil(totalItems / columnsCount);

  // Get current position in 1D or 2D grid
  const getCurrentPosition = useCallback((key) => {
    const index = itemKeys.indexOf(key);
    if (index === -1) return { index: 0, row: 0, col: 0 };

    const row = Math.floor(index / columnsCount);
    const col = index % columnsCount;

    return { index, row, col };
  }, [itemKeys, columnsCount]);

  // Navigate to specific key
  const navigateTo = useCallback((newKey) => {
    if (disabled || !itemKeys.includes(newKey)) return;

    const oldKey = activeKey;
    setActiveKey(newKey);
    onActiveChange?.(newKey, oldKey);
  }, [activeKey, disabled, itemKeys, onActiveChange]);

  // Navigation delegate using imported modules
  const keyboardDelegate = useCallback(() => {
    const delegateConfig = createNavigationDelegate(orientation, {
      itemKeys,
      totalItems,
      loop,
      getCurrentPosition,
      actualColumnsCount: columnsCount,
      rowsCount,
    });

    return createKeyboardDelegate(delegateConfig, {
      disabled,
      activeKey,
    });
  }, [orientation, itemKeys, totalItems, loop, getCurrentPosition, columnsCount, rowsCount, disabled, activeKey]);

  // Navigate in specific direction using keyboard delegate
  const navigate = useCallback((direction) => {
    const delegate = keyboardDelegate();
    const nextKey = delegate.getNextKey(direction);
    if (nextKey !== null) {
      navigateTo(nextKey);
    }
  }, [keyboardDelegate, navigateTo]);

  // Keyboard event handler
  const handleKeyDown = useCallback((event) => {
    if (disabled) return;

    let handled = false;

    switch (event.key) {
      case "ArrowRight":
        navigate(orientation === "horizontal" || orientation === "both" ? "right" : "next");
        handled = true;
        break;
      case "ArrowLeft":
        navigate(orientation === "horizontal" || orientation === "both" ? "left" : "previous");
        handled = true;
        break;
      case "ArrowDown":
        navigate("down");
        handled = true;
        break;
      case "ArrowUp":
        navigate("up");
        handled = true;
        break;
      case "Home":
        navigate("home");
        handled = true;
        break;
      case "End":
        navigate("end");
        handled = true;
        break;
      case "Escape":
        // Escape key should bubble up to Overlay to close the menu
        // Don't mark as handled so it propagates
        break;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }

    return handled;
  }, [disabled, navigate, orientation]);

  // Get props for the trigger element (input/combobox) that maintains focus
  const getTriggerProps = useCallback(() => {
    if (disabled) return {};

    return {
      role: "combobox",
      "aria-controls": listboxId,
      "aria-expanded": true,
      "aria-activedescendant": activeKey ? `${listboxId}-option-${activeKey}` : undefined,
      "aria-autocomplete": "list",
      onKeyDown: handleKeyDown,
    };
  }, [disabled, listboxId, activeKey, handleKeyDown]);

  // Get props for collection container (listbox)
  const getCollectionProps = useCallback(() => {
    if (disabled) return {};

    return {
      ...aria.getCollectionAriaProps(),
      id: listboxId,
      role: role || "listbox",
    };
  }, [disabled, aria, listboxId, role]);

  // Get props for individual items
  // In active descendant pattern, items don't receive focus and don't need tabIndex
  const getItemProps = useCallback((key, options = {}) => {
    if (disabled) return {};

    const isActive = key === activeKey;

    return {
      id: `${listboxId}-option-${key}`,
      role: "option",
      "aria-selected": isActive,
      "data-active-descendant": isActive,
      ref: (element) => {
        if (element) {
          itemRefs.current.set(key, element);
        } else {
          itemRefs.current.delete(key);
        }
        // Call any existing ref from options
        if (typeof options.ref === 'function') {
          options.ref(element);
        } else if (options.ref) {
          options.ref.current = element;
        }
      },
    };
  }, [disabled, activeKey, listboxId]);

  // Utility functions
  const isActive = useCallback((key) => key === activeKey, [activeKey]);

  const getActiveIndex = useCallback(() => {
    return getCurrentPosition(activeKey).index;
  }, [getCurrentPosition, activeKey]);

  // Scroll active item into view when it changes
  useEffect(() => {
    if (disabled || !activeKey) return;

    const activeElement = itemRefs.current.get(activeKey);
    if (activeElement) {
      activeElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeKey, disabled]);

  return {
    // State
    activeKey,
    activeIndex: getActiveIndex(),
    totalItems,

    // Navigation methods
    navigateTo,
    navigate,

    // Utilities
    isActive,
    getCurrentPosition,

    // Props getters - KEY DIFFERENCE: getTriggerProps for the input
    getTriggerProps,
    getCollectionProps,
    getItemProps,
    handleKeyDown,

    // Configuration
    orientation,
    columnsCount,
    loop,
    disabled,
  };
};
