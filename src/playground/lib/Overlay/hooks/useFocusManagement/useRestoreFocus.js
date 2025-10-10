import { useEffect } from 'react';

/**
 * Restores focus to a previously stored element
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.shouldRestore - When true, restores focus
 * @param {React.RefObject} options.elementRef - Ref containing the element to restore focus to
 */
const useRestoreFocus = ({ shouldRestore, elementRef }) => {
  useEffect(() => {
    if (shouldRestore && elementRef.current) {
      if (document.contains(elementRef.current)) {
        elementRef.current.focus({ preventScroll: true });
      }
    }
  }, [shouldRestore, elementRef]);
};

export default useRestoreFocus;
