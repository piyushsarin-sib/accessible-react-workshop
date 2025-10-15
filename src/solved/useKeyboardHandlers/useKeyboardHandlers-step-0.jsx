/* eslint-disable */

import { useEffect, useCallback } from "react";
import { shouldCloseOnEscape, shouldApplyFocusTrap, applyFocusTrap } from "../helpers/keyHandlers";
import { isTabKey } from "../helpers/keyUtils";

/**
 * Custom hook for handling keyboard events in overlays
 * Orchestrates pure helper functions and manages state updates
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.visible - Whether the overlay is visible
 * @param {Function} options.setVisible - Function to set visibility
 * @param {React.RefObject} options.containerRef - Ref to the overlay container
 * @param {boolean} options.backdrop - Whether backdrop is present
 * @param {string} options.placement - Overlay placement
 */
const useKeyboardHandlers = ({ visible, setVisible, containerRef, backdrop, placement }) => {
  const handleKeyDown = useCallback(
    (event) => {
      // 1. Handle Escape key
      if (shouldCloseOnEscape(event)) {
        //  setVisible(false);
        //  return;
      }

      // if (isTabKey(event)) {
      //   // For modal overlays: apply focus trap
      //   if (shouldApplyFocusTrap(backdrop, placement)) {
      //     applyFocusTrap(event, containerRef?.current);
      //   } else {
      //     setVisible(false);
      //   }
      // }
    },
    [setVisible, containerRef, backdrop, placement],
  );

  // Attach keyboard event listeners
  useEffect(() => {
    if (visible) {
      document.addEventListener("keydown", handleKeyDown, true);
      return () => {
        document.removeEventListener("keydown", handleKeyDown, true);
      };
    }
  }, [visible, handleKeyDown]);
};

export default useKeyboardHandlers;
