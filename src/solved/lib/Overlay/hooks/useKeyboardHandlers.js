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
        setVisible(false);
        return;
      }

      // 2. TODO Handle Tab key
      // INSTRUCTIONS:
      // - Check if the pressed key is Tab using: isTabKey(event)
      // - If it's a Tab key:
      //   a) Check if focus trap should be applied using: shouldApplyFocusTrap(backdrop, placement)
      //      - backdrop: boolean indicating if backdrop exists
      //      - placement: string like 'center', 'top', etc.
      //   b) If focus trap should apply:
      //      - Call: applyFocusTrap(event, containerRef?.current)
      //        - event: the keyboard event
      //        - containerRef?.current: the overlay DOM element
      //   c) If focus trap should NOT apply (non-modal overlays):
      //      - Close the overlay: set visibility to false using setVisible

      if (isTabKey(event)) {
        // For modal overlays: apply focus trap
        if (shouldApplyFocusTrap(backdrop, placement)) {
          applyFocusTrap(event, containerRef?.current);
        }
      }
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
