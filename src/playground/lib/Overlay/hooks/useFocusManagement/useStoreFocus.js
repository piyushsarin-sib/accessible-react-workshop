import { useLayoutEffect, useRef } from 'react';

/**
 * Stores the currently focused element when a condition becomes true
 * Uses useLayoutEffect to capture focus synchronously before other effects run
 *
 * @param {boolean} shouldStore - When true, stores the current active element
 * @returns {React.RefObject} Ref containing the last active element
 */
const useStoreFocus = (shouldStore) => {
  const lastActiveElementRef = useRef();

  useLayoutEffect(() => {
    if (shouldStore) {
      lastActiveElementRef.current = document.activeElement;
    }
  }, [shouldStore]);

  return lastActiveElementRef;
};

export default useStoreFocus;
