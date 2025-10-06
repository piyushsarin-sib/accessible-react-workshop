import { useId } from 'react';
import useOverlay from '../Overlay/hooks/useOverlay';

/**
 * Hook for integrating menu with overlay
 * Provides overlay controls (trigger props, open/close/toggle) for menu
 *
 * @param {Object} options - Configuration options
 * @param {Object} options.overlayConfig - Overlay configuration (placement, offset, etc)
 * @param {Object} options.style - Inline styles for overlay
 * @param {string} options.className - CSS class for overlay
 * @param {string} options.triggerId - ID for trigger element
 * @param {string} options.overlayId - ID for overlay element
 * @returns {Object} Overlay controls (trigger, body, open, close, toggle, setVisible)
 */
export const useMenu = ({
  overlayConfig,
  style,
  className,
  triggerId,
  overlayId
} = {}) => {
  // Generate stable IDs for overlay integration
  const generatedTriggerId = useId();
  const generatedOverlayId = useId();

  // Always call useOverlay (unconditional hook call)
  // Use stable generated IDs if not provided
  const overlayControls = useOverlay({
    pattern: 'menu',
    ...(overlayConfig || {}),
    style,
    className,
    triggerId: triggerId || generatedTriggerId,
    bodyId: overlayId || generatedOverlayId
  });

  return overlayControls;
};