import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { createNavigationDelegate } from "../delegates/index.js";
import { createKeyboardDelegate } from "../utils/keyboardPrimitives.js";

/**
 * Hook for managing roving tabindex keyboard navigation with automatic layout detection
 * Supports 1D lists, horizontal navigation, and 2D grids with universal layout compatibility
 *
 * @param {Object} options - Configuration options
 * @param {Array} options.items - Array of items or keys to navigate through
 * @param {('vertical'|'horizontal'|'both')} options.orientation - Navigation orientation
 *   - 'vertical': Up/down navigation (lists, menus)
 *   - 'horizontal': Left/right navigation only
 *   - 'both': 2D grid navigation with automatic column detection
 * @param {number} [options.columnsCount=1] - Hint for 2D grid columns (auto-detected if not provided)
 * @param {number|string} [options.defaultActiveKey=0] - Initially active item key/index
 * @param {Function} [options.onActiveChange] - Callback when active item changes: (newKey, oldKey) => void
 * @param {boolean} [options.loop=true] - Whether to loop at collection boundaries
 * @param {boolean} [options.disabled=false] - Whether navigation is disabled
 *
 * @returns {Object} Navigation state and methods
 * @returns {number|string} return.activeKey - Currently active item key
 * @returns {number} return.activeIndex - Currently active item index
 * @returns {number} return.totalItems - Total number of items
 * @returns {Function} return.navigateTo - Navigate to specific key: (key) => void
 * @returns {Function} return.navigate - Navigate in direction: (direction) => void
 * @returns {Function} return.getCollectionProps - Props for collection container
 * @returns {Function} return.getItemProps - Props for individual items: (key, options?) => object
 * @returns {Function} return.isActive - Check if key is active: (key) => boolean
 * @returns {Object} return.getCurrentPosition - Get position info: (key?) => {index, row, col}
 */
export const useRovingIndex = ({
  items = [],
  orientation = "vertical",
  columnsCount = 1,
  defaultActiveKey = 0,
  onActiveChange,
  loop = true,
  disabled = false,
} = {}) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);
  const itemRefs = useRef(new Map()); // Map to store element refs: key -> element
  const containerRef = useRef(null); // Reference to the grid container

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

  // Optimized column detection for any layout system
  const getActualColumnsCount = useCallback(() => {
    if (orientation !== "both" || itemRefs.current.size < 2) {
      return columnsCount; // Fallback for non-2D layouts or insufficient items
    }

    // Get all visible DOM elements
    const itemElements = Array.from(itemRefs.current.values())
      .filter(el => el && el.offsetParent !== null); // Only visible elements

    if (itemElements.length < 2) return columnsCount;

    // Performance optimization: Only sample first row + a few extra items
    // For large collections, we don't need to check every single item
    const sampleSize = Math.min(itemElements.length, Math.max(20, columnsCount * 2));
    const sampleElements = itemElements.slice(0, sampleSize);

    // Use getBoundingClientRect only on sample elements
    const firstRect = sampleElements[0].getBoundingClientRect();
    const tolerance = 5; // Handle sub-pixel positioning differences

    let detectedColumns = 1;
    for (let i = 1; i < sampleElements.length; i++) {
      const currentRect = sampleElements[i].getBoundingClientRect();

      // Same row if tops are within tolerance
      if (Math.abs(currentRect.top - firstRect.top) <= tolerance) {
        detectedColumns++;
      } else {
        break; // Hit second row
      }
    }

    return Math.max(detectedColumns, 1);
  }, [orientation, columnsCount]);

  const [dynamicColumnsCount, setDynamicColumnsCount] = useState(() => getActualColumnsCount());

  // ResizeObserver for 2D grids only - recalculates columns on container resize
  useEffect(() => {
    if (orientation !== "both" || !containerRef.current || disabled) {
      return;
    }

    const observer = new ResizeObserver(() => {
      const newCount = getActualColumnsCount();
      if (newCount !== dynamicColumnsCount) {
        setDynamicColumnsCount(newCount);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [orientation, disabled, getActualColumnsCount, dynamicColumnsCount]);

  // Update columns count when items change (for non-resize scenarios)
  useEffect(() => {
    if (orientation === "both") {
      const newCount = getActualColumnsCount();
      if (newCount !== dynamicColumnsCount) {
        setDynamicColumnsCount(newCount);
      }
    }
  }, [itemKeys.length, orientation, getActualColumnsCount, dynamicColumnsCount]);

  const actualColumnsCount = orientation === "both" ? dynamicColumnsCount : columnsCount;
  const totalItems = itemKeys.length;
  const rowsCount = Math.ceil(totalItems / actualColumnsCount);

  // Focus management - focus the active element when activeKey changes
  useEffect(() => {
    if (disabled || !activeKey) return;

    const activeElement = itemRefs.current.get(activeKey);
    if (activeElement && activeElement !== document.activeElement) {
      activeElement.focus();
    }
  }, [activeKey, disabled]);

  // Get current position in 1D or 2D grid
  const getCurrentPosition = useCallback((key) => {
    const index = itemKeys.indexOf(key);
    if (index === -1) return { index: 0, row: 0, col: 0 };

    const row = Math.floor(index / actualColumnsCount);
    const col = index % actualColumnsCount;

    return { index, row, col };
  }, [itemKeys, actualColumnsCount]);

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
      actualColumnsCount,
      rowsCount,
    });

    return createKeyboardDelegate(delegateConfig, {
      disabled,
      activeKey,
    });
  }, [orientation, itemKeys, totalItems, loop, getCurrentPosition, actualColumnsCount, rowsCount, disabled, activeKey]);

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
      case "PageDown":
        // Move down by one row (for 2D grids) or by 10 items (for lists)
        if (orientation === "both") {
          navigate("down");
        } else {
          const current = getCurrentPosition(activeKey);
          const newIndex = Math.min(current.index + 10, totalItems - 1);
          navigateTo(itemKeys[newIndex]);
        }
        handled = true;
        break;
      case "PageUp":
        // Move up by one row (for 2D grids) or by 10 items (for lists)
        if (orientation === "both") {
          navigate("up");
        } else {
          const current = getCurrentPosition(activeKey);
          const newIndex = Math.max(current.index - 10, 0);
          navigateTo(itemKeys[newIndex]);
        }
        handled = true;
        break;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }

    return handled;
  }, [disabled, navigate, orientation, getCurrentPosition, activeKey, totalItems, itemKeys, navigateTo]);

  // Get props for collection container (navigation only - ARIA handled by Collection component)
  const getCollectionProps = useCallback(() => {
    if (disabled) return {};

    return {
      onKeyDown: handleKeyDown,
      ref: containerRef,
    };
  }, [disabled, handleKeyDown]);

  // Get props for individual items
  const getItemProps = useCallback((key, options = {}) => {
    if (disabled) return {};

    const isActive = key === activeKey;
    const { focusable = true } = options;

    return {
      tabIndex: isActive && focusable ? 0 : -1,
      "data-roving-index-active": isActive,
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
      onFocus: (event) => {
        // Update active key when item receives focus (for keyboard navigation)
        if (isActive !== true) {
          navigateTo(key);
        }
        options.onFocus?.(event);
      },
    };
  }, [disabled, activeKey, navigateTo]);

  // Utility functions
  const isActive = useCallback((key) => key === activeKey, [activeKey]);

  const getActiveIndex = useCallback(() => {
    return getCurrentPosition(activeKey).index;
  }, [getCurrentPosition, activeKey]);


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

    // Props getters
    getCollectionProps,
    getItemProps,
    handleKeyDown,

    // Configuration
    orientation,
    columnsCount: actualColumnsCount,
    loop,
    disabled,
  };
};