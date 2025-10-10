/* eslint-disable */

import React, { useId, useState, useCallback } from "react";
import useOverlay from "@solved/lib/Overlay/hooks/useOverlay";

/**
 * Hook for integrating combobox with overlay and active descendant navigation
 * Similar to useMenu but manages activeKey and provides trigger props for aria-activedescendant
 *
 * The key difference from useMenu:
 * - Maintains activeKey state for keyboard navigation
 * - Provides getTriggerProps() that includes aria-activedescendant
 * - Keyboard handler updates activeKey (focus stays on input)
 *
 * @param {Object} options - Configuration options
 * @param {Object} options.overlayConfig - Overlay configuration (placement, offset, etc)
 * @param {Object} options.style - Inline styles for overlay
 * @param {string} options.className - CSS class for overlay
 * @param {string} options.triggerId - ID for trigger element (input)
 * @param {string} options.overlayId - ID for overlay element
 * @param {string} options.listboxId - ID for listbox (required for aria-activedescendant)
 * @returns {Object} Overlay controls + getTriggerProps + activeKey + setActiveKey + listboxId
 */
export const useComboBox = ({
  overlayConfig,
  style,
  className,
  triggerId,
  overlayId,
  listboxId,
} = {}) => {
  // Generate stable IDs
  const generatedTriggerId = useId();
  const generatedOverlayId = useId();
  const generatedListboxId = useId();

  const finalListboxId = listboxId || generatedListboxId;

  // Track which item is currently active (for aria-activedescendant)
  const [activeKey, setActiveKey] = useState(null);

  // Get overlay controls for positioning and visibility
  const overlayControls = useOverlay({
    pattern: "menu",
    ...(overlayConfig || {}),
    style,
    className,
    triggerId: triggerId || generatedTriggerId,
    bodyId: overlayId || generatedOverlayId,
  });

  // Store the keyboard handler from ComboBoxList
  const keyboardHandlerRef = React.useRef(null);

  // Get props for the input trigger (includes aria-activedescendant)
  const getTriggerProps = useCallback(() => {
    // Merge keyboard handlers - call both Overlay's handler and navigation handler
    const mergedKeyDown = (event) => {
      // Handle Enter key to open menu
      if (event.key === "Enter" && !overlayControls.body.visible) {
        event.preventDefault();
        overlayControls.open();
        return;
      }

      // Call the trigger's original onKeyDown (from Overlay) first
      if (overlayControls.trigger.onKeyDown) {
        overlayControls.trigger.onKeyDown(event);
      }
      // Then call navigation handler if not already handled
      if (!event.defaultPrevented && keyboardHandlerRef.current) {
        keyboardHandlerRef.current(event);
      }
    };

    return {
      role: "combobox",
      "aria-controls": finalListboxId,
      "aria-expanded": overlayControls.body.visible,
      "aria-autocomplete": "list",
      "aria-activedescendant": activeKey ? `${finalListboxId}-option-${activeKey}` : undefined,
      onKeyDown: mergedKeyDown,
    };
  }, [
    finalListboxId,
    overlayControls.body.visible,
    activeKey,
    overlayControls.trigger,
    overlayControls.open,
    keyboardHandlerRef,
  ]);

  return {
    // Overlay controls (same as useMenu)
    ...overlayControls,

    // Trigger props for the input (includes aria-activedescendant)
    getTriggerProps,

    // Active key management (for keyboard navigation)
    activeKey,
    setActiveKey,

    // Keyboard handler ref (to be set by ComboBoxList)
    keyboardHandlerRef,

    // ListboxId for aria-activedescendant linkage
    listboxId: finalListboxId,
  };
};
