import React from "react";
import PropTypes from "prop-types";
import { Overlay } from "@lib/Overlay";
import { PLACEMENTS } from "@lib/Overlay";

/**
 * Modal component - A specialized Overlay for modal dialogs
 * Provides default modal behavior with title and close button
 */
const Modal = ({
  trigger,
  body,
  open,
  close,
  toggle,
  setVisible,
  title,
  children,
  showCloseButton = true,
  closeOnOutsideClick = true,
  autoFocus = true,
  zIndex = 1000,
  style = {},
  className = "",
  ...props
}) => {
  return (
    <Overlay
      trigger={trigger}
      body={body}
      open={open}
      close={close}
      toggle={toggle}
      setVisible={setVisible}
      pattern="modal"
      backdrop={true}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autoFocus}
      closeOnOutsideClick={closeOnOutsideClick}
      zIndex={zIndex}
      {...props}
    >
      <div
        className={`modal-container ${className}`}
        style={{
          padding: "24px",
          position: "relative",
          ...style,
        }}
      >
        {/* Header with title and close button */}
        {(title || showCloseButton) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: title ? "16px" : "0",
            }}
          >
            {title && (
              <h2
                id={body?.id ? `${body.id}-title` : undefined}
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1a1a1a",
                }}
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={close}
                aria-label="Close modal"
                style={{
                  marginLeft: "auto",
                  padding: "4px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "24px",
                  lineHeight: "1",
                  color: "#666",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f0f0f0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                &times;
              </button>
            )}
          </div>
        )}

        {/* Content area */}
        <div className="modal-content">{children}</div>
      </div>
    </Overlay>
  );
};

Modal.propTypes = {
  trigger: PropTypes.object,
  body: PropTypes.object,
  open: PropTypes.func,
  close: PropTypes.func,
  toggle: PropTypes.func,
  setVisible: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  showCloseButton: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  autoFocus: PropTypes.bool,
  zIndex: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Modal;
