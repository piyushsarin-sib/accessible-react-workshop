import { useId, useRef } from "react";
import useOverlay from "@lib/Overlay/hooks/useOverlay";
import { useActiveDescendant } from "@lib/interactions/keyboard/hooks/useActiveDescendant";
import { useSelection } from "@lib/interactions/selection/useSelection";

/**
 * Hook for integrating combobox with overlay, active descendant navigation, and selection
 * This is a convenience wrapper that combines useOverlay + useActiveDescendant + useSelection
 * and merges their trigger props for consumers
 *
 * @param {Object} options - Configuration options
 * @param {Array} options.items - Array of items for navigation (optional - if not provided, itemsRef will be used)
 * @param {Object} options.overlayConfig - Overlay configuration (placement, offset, etc)
 * @param {Object} options.style - Inline styles for overlay
 * @param {string} options.className - CSS class for overlay
 * @param {string} options.triggerId - ID for trigger element (input)
 * @param {string} options.overlayId - ID for overlay element
 * @param {string} options.listboxId - ID for listbox (required for aria-activedescendant)
 * @param {string} options.selectionMode - Selection mode: 'single', 'multiple', or 'none'
 * @param {Array} options.selectedKeys - Controlled selected keys
 * @param {Array} options.defaultSelectedKeys - Default selected keys (uncontrolled mode)
 * @param {Function} options.onChange - Selection change handler
 * @param {string} options.ariaLabel - Accessible label for the combobox
 * @returns {Object} Overlay controls + merged trigger props + listboxId + selection state
 */
export const useComboBox = ({
  items,
  overlayConfig,
  style,
  className,
  triggerId,
  overlayId,
  listboxId,
  selectionMode = "single",
  selectedKeys,
  defaultSelectedKeys,
  onChange,
  ariaLabel,
} = {}) => {
  // Generate stable IDs (lazy generation - only if not provided)
  const generatedTriggerId = useId();
  const generatedOverlayId = useId();
  const generatedListboxId = useId();

  const finalTriggerId = triggerId || generatedTriggerId;
  const finalOverlayId = overlayId || generatedOverlayId;
  const finalListboxId = listboxId || generatedListboxId;

  // Ref to store items from ComboBoxList
  const itemsRef = useRef([]);

  // Get overlay controls for positioning and visibility
  const overlayControls = useOverlay({
    pattern: "menu",
    ...(overlayConfig || {}),
    style,
    className,
    triggerId: finalTriggerId,
    bodyId: finalOverlayId,
  });

  // Use items prop if provided, otherwise fallback to itemsRef.current
  const navigationItems = items || itemsRef.current;

  // Use selection for managing selected state
  const selection = useSelection({
    selectionMode,
    selectedKeys: selectedKeys !== undefined ? new Set(selectedKeys) : undefined,
    defaultSelectedKeys: defaultSelectedKeys ? new Set(defaultSelectedKeys) : new Set(),
    onChange: (event, { selectedKeys: newSelectedKeys }) => {
      onChange?.(event, { selectedKeys: newSelectedKeys });
    },
    pattern: "menu",
    label: ariaLabel,
  });

  // Use active descendant for keyboard navigation
  const navigation = useActiveDescendant({
    items: navigationItems,
    orientation: "vertical",
    loop: true,
    defaultActiveKey: navigationItems.length > 0 ? navigationItems[0].key || navigationItems[0].id : null,
    listboxId: finalListboxId,
  });

  // Merge trigger props from overlay and combobox
  const trigger = {
    ...overlayControls.trigger,      // aria-expanded, aria-controls, aria-haspopup, onKeyDown (Escape)
    role: "combobox",
    "aria-autocomplete": "list",
    "aria-activedescendant": navigation.activeDescendantId,
    onKeyDown: (event) => {
      // Handle Enter and Space keys for selection
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        if (!overlayControls.body.visible) {
          // Menu closed - open it
          overlayControls.open();
        } else if (navigation.activeKey) {
          // Menu open and has active item - trigger selection
          // Per ARIA guidelines: Enter and Space accept the focused option in the listbox
          const item = navigationItems.find(
            (i) => (i.key || i.id) === navigation.activeKey
          );
          selection.toggleSelection(event, { key: navigation.activeKey, item });

          // Close menu after selection (standard combobox behavior)
          overlayControls.close();
        }
        return;
      }

      // Handle Down Arrow - open menu if closed (per ARIA guidelines)
      if (event.key === "ArrowDown" && !overlayControls.body.visible) {
        event.preventDefault();
        overlayControls.open();
        return;
      }

      // Call overlay's onKeyDown first (handles Escape)
      if (overlayControls.trigger.onKeyDown) {
        overlayControls.trigger.onKeyDown(event);
      }

      // Then call navigation handler if not already handled (handles arrow keys)
      if (!event.defaultPrevented) {
        navigation.handleKeyDown(event);
      }
    },
  };

  return {
    // Overlay methods
    open: overlayControls.open,
    close: overlayControls.close,
    toggle: overlayControls.toggle,
    setVisible: overlayControls.setVisible,
    body: overlayControls.body,

    // Merged trigger props object
    trigger,

    // Navigation state
    navigation,

    // Selection state
    selection,
    selectedKeys: selection.selectedKeys,

    // Ref for ComboBoxList to populate with items (for children-based rendering)
    itemsRef,

    // ListboxId for ComboBoxList
    listboxId: finalListboxId,
  };
};
