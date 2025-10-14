import { useState, useCallback, useMemo, useEffect, useRef } from "react";
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
 * Note: This hook does NOT set roles or labels - those should come from useCollectionAria
 *
 * @param {Object} options - Configuration options
 * @param {Array} options.items - Array of items or keys to navigate through
 * @param {('vertical'|'horizontal'|'both')} options.orientation - Navigation orientation
 * @param {number|string} [options.defaultActiveKey=null] - Initially active item key/index
 * @param {Function} [options.onActiveChange] - Callback when active item changes: (newKey, oldKey) => void
 * @param {boolean} [options.loop=true] - Whether to loop at collection boundaries
 * @param {boolean} [options.disabled=false] - Whether navigation is disabled
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
  listboxId,
} = {}) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);
  const itemRefs = useRef(new Map()); // Map to store element refs: key -> element

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

  // Memoize computed values
  const totalItems = useMemo(() => itemKeys.length, [itemKeys]);
  const rowsCount = useMemo(() => Math.ceil(totalItems / columnsCount), [totalItems, columnsCount]);

  // Create index map for O(1) key lookups
  const keyToIndexMap = useMemo(() => {
    const map = new Map();
    itemKeys.forEach((key, index) => map.set(key, index));
    return map;
  }, [itemKeys]);

  // Get current position in 1D or 2D grid (O(1) lookup using Map)
  const getCurrentPosition = useCallback(
    (key) => {
      const index = keyToIndexMap.get(key);
      if (index === undefined) return { index: 0, row: 0, col: 0 };

      const row = Math.floor(index / columnsCount);
      const col = index % columnsCount;

      return { index, row, col };
    },
    [keyToIndexMap, columnsCount],
  );

  // Navigate to specific key
  const navigateTo = useCallback(
    (newKey) => {
      if (disabled || !keyToIndexMap.has(newKey)) return;

      const oldKey = activeKey;
      setActiveKey(newKey);
      onActiveChange?.(newKey, oldKey);
    },
    [activeKey, disabled, keyToIndexMap, onActiveChange],
  );

  // Memoize the navigation delegate configuration
  const delegateConfig = useMemo(() => {
    return createNavigationDelegate(orientation, {
      itemKeys,
      totalItems,
      loop,
      getCurrentPosition,
      actualColumnsCount: columnsCount,
      rowsCount,
    });
  }, [orientation, itemKeys, totalItems, loop, getCurrentPosition, columnsCount, rowsCount]);

  // Navigate in specific direction using keyboard delegate
  const navigate = useCallback(
    (direction) => {
      const delegate = createKeyboardDelegate(delegateConfig, {
        disabled,
        activeKey,
      });

      const nextKey = delegate.getNextKey(direction);
      if (nextKey !== null) {
        navigateTo(nextKey);
      }
    },
    [delegateConfig, disabled, activeKey, navigateTo],
  );

  // Memoize orientation check for horizontal navigation
  const isHorizontalNavigation = useMemo(() => {
    return orientation === "horizontal" || orientation === "both";
  }, [orientation]);

  // Keyboard event handler
  const handleKeyDown = useCallback(
    (event) => {
      if (disabled) return;

      let handled = false;

      switch (event.key) {
        case "ArrowRight":
          navigate(isHorizontalNavigation ? "right" : "next");
          handled = true;
          break;
        case "ArrowLeft":
          navigate(isHorizontalNavigation ? "left" : "previous");
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
    },
    [disabled, navigate, isHorizontalNavigation],
  );

  // Memoize active index calculation
  const activeIndex = useMemo(() => {
    return getCurrentPosition(activeKey).index;
  }, [getCurrentPosition, activeKey]);

  // Get props for individual items
  // In active descendant pattern, items don't receive focus and don't need tabIndex
  // Note: role should come from useCollectionAria, not here
  const getItemProps = useCallback(
    (key, options = {}) => {
      if (disabled) return {};

      const isActive = key === activeKey;

      return {
        id: `${listboxId}-${key}`,
        "data-active-descendant": isActive,
        ref: (element) => {
          if (element) {
            itemRefs.current.set(key, element);
          } else {
            itemRefs.current.delete(key);
          }
          // Call any existing ref from options
          if (typeof options.ref === "function") {
            options.ref(element);
          } else if (options.ref) {
            options.ref.current = element;
          }
        },
      };
    },
    [disabled, activeKey, listboxId],
  );

  // Scroll active item into view when it changes
  useEffect(() => {
    if (disabled || !activeKey) return;

    const activeElement = itemRefs.current.get(activeKey);
    if (activeElement) {
      activeElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeKey, disabled]);

  // Compute aria-activedescendant ID for trigger element
  // This should be used by the parent (e.g., useComboBox) to set on the trigger
  const activeDescendantId = activeKey ? `${listboxId}-${activeKey}` : undefined;

  // Collection props - for listbox container
  // Note: role and labels should come from useCollectionAria, not here
  // This only provides the ID for aria-activedescendant linkage
  const collection = disabled
    ? {}
    : {
        id: listboxId,
      };

  return {
    // State
    activeKey,
    activeIndex,
    totalItems,

    // Navigation methods
    navigateTo,
    navigate,
    handleKeyDown, // Export for parent to use in trigger

    // Utilities
    isActive: (key) => key === activeKey,
    getCurrentPosition,

    // For aria-activedescendant attribute on trigger
    activeDescendantId,
    listboxId,

    // Props objects
    collection, // For listbox container (just id)
    getItemProps, // Function needed for dynamic keys

    // Configuration
    orientation,
    columnsCount,
    loop,
    disabled,
  };
};
