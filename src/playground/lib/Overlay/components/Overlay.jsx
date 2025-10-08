import React, { useRef } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { PLACEMENTS } from "../constants";
import usePosition from "../hooks/usePosition";
import OverlayContent from "./OverlayContent";
import Backdrop from "./Backdrop";
import useClickOutside from "../hooks/useClickOutside";
import useFocusManagement from "../hooks/useFocusManagement";
import useKeyboardHandlers from "../hooks/useKeyboardHandlers";
import useInert from "../hooks/useInert";
import useScrollLock from "../hooks/useScrollLock";
import "../Overlay.css";

const Overlay = ({
  body = {},
  trigger = {},
  children,
  setVisible,
  close,
  open,
  toggle,
  portalTarget,
  backdrop = false,
  pattern = "menu",
  autoFocus = true,
  closeOnOutsideClick = true,
  zIndex = 1000,
}) => {
  const {
    ref,
    elevation = true,
    border = true,
    visible = false,
    id: bodyId,
    placement = PLACEMENTS.BOTTOM_START,
    style = {},
    className = "",
  } = body;

  const { ref: triggerRef, id: triggerId } = trigger;
  const backdropRef = useRef();

  // Build CSS class names
  const overlayClasses = [
    "overlay",
    elevation && "overlay--elevation",
    border && "overlay--border",
    placement === PLACEMENTS.CENTER && "overlay--modal",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Dynamic styles (only what can't be in CSS)
  const overlayStyles = {
    zIndex: backdrop && placement === PLACEMENTS.CENTER ? zIndex + 1 : zIndex,
    ...style,
  };

  const { position } = usePosition(visible, placement, triggerRef, ref);

  // Handle outside clicks using custom hook
  useClickOutside({
    ref,
    triggerRef,
    backdropRef,
    enabled: visible && closeOnOutsideClick,
    hasBackdrop: backdrop,
    setVisible,
  });

  // Handle focus management
  useFocusManagement({
    visible,
    autoFocus,
    containerRef: ref,
  });

  // Handle keyboard events
  useKeyboardHandlers({
    visible,
    setVisible,
    containerRef: ref,
    backdrop,
    placement,
  });

  // Handle inert attribute on background (for modal overlays)
  useInert({
    isOpen: visible,
    isModal: backdrop || placement === PLACEMENTS.CENTER,
  });

  // Handle scroll lock on background (for modal overlays)
  useScrollLock({
    isLocked: visible && (backdrop || placement === PLACEMENTS.CENTER),
  });

  // Don't render if not visible
  if (!visible) return null;

  // Portal content
  const overlayContent = (
    <OverlayContent
      ref={ref}
      bodyId={bodyId}
      className={overlayClasses}
      overlayStyles={overlayStyles}
      position={position}
      placement={placement}
      pattern={pattern}
      triggerId={triggerId}
      backdrop={backdrop}
      close={close}
      open={open}
      toggle={toggle}
    >
      {children}
    </OverlayContent>
  );

  // Render with or without backdrop
  const portalContent = backdrop ? (
    <Backdrop backdropRef={backdropRef} zIndex={zIndex}>
      {overlayContent}
    </Backdrop>
  ) : (
    overlayContent
  );

  return ReactDOM.createPortal(
    portalContent,
    portalTarget?.current || portalTarget || document.body,
  );
};

Overlay.propTypes = {
  body: PropTypes.shape({
    ref: PropTypes.object,
    elevation: PropTypes.bool,
    border: PropTypes.bool,
    visible: PropTypes.bool,
    id: PropTypes.string,
    placement: PropTypes.oneOf(Object.values(PLACEMENTS)),
    style: PropTypes.object,
    className: PropTypes.string,
  }),
  trigger: PropTypes.shape({
    ref: PropTypes.object,
    id: PropTypes.string,
  }),
  setVisible: PropTypes.func,
  children: PropTypes.node,
  close: PropTypes.func,
  open: PropTypes.func,
  toggle: PropTypes.func,
  portalTarget: PropTypes.oneOfType([
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    PropTypes.instanceOf(Element),
    PropTypes.func,
  ]),
  backdrop: PropTypes.bool,
  pattern: PropTypes.oneOf(["menu", "dialog", "modal", "popover", "tooltip"]),
  autoFocus: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  zIndex: PropTypes.number,
};

export default Overlay;
