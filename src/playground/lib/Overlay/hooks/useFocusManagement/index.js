import useStoreFocus from './useStoreFocus';
import useAutoFocus from './useAutoFocus';
import useRestoreFocus from './useRestoreFocus';

/**
 * Main hook for managing focus in overlays
 * Combines storing, auto-focusing, and restoring focus
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.visible - Whether the overlay is visible
 * @param {boolean} options.autoFocus - Whether to auto-focus on open
 * @param {React.RefObject} options.containerRef - Ref to the overlay container
 */
const useFocusManagement = ({ visible, autoFocus = true, containerRef }) => {
  // Store the previously focused element when overlay opens
  const lastActiveElementRef = useStoreFocus(visible);

  // Auto-focus first focusable element when overlay opens
  useAutoFocus({
    enabled: visible && autoFocus,
    containerRef,
  });

  // Restore focus when overlay closes
  useRestoreFocus({
    shouldRestore: !visible,
    elementRef: lastActiveElementRef,
  });
};

export default useFocusManagement;

// Export individual hooks for reuse
export { useStoreFocus, useAutoFocus, useRestoreFocus };
