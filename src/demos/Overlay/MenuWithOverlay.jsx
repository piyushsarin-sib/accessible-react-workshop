import React from "react";
import { useOverlay, Overlay, PLACEMENTS } from "../../lib/Overlay";
import Button from "../../components/common/Button";
import Menu from "../../lib/Menu";

const MenuWithOverlay = () => {
  const menuDisclosure = useOverlay({
    placement: PLACEMENTS.BOTTOM_START,
    pattern: "menu",
    style: { width: "200px" },
    bodyId: "menu-overlay",
    triggerId: "menu-overlay-trigger",
  });

  const handleMenuChange = (event, { selectedItems }) => {
    console.log("Menu selection changed:", selectedItems);
    menuDisclosure.close();
  };

  return (
    <div style={{ padding: "50px" }}>
      <h3 style={{ marginBottom: "20px" }}>Menu with Overlay</h3>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Click the button to open a menu. Use ESC to close, or click outside.
      </p>

      <Button
        variant="secondary"
        onClick={() => console.log("Previous button clicked")}
        style={{ marginRight: "12px" }}
      >
        Previous Button
      </Button>

      <Button {...menuDisclosure.trigger} onClick={menuDisclosure.toggle} variant="primary">
        Open Menu ▼
      </Button>

      <Overlay
        {...menuDisclosure}
        pattern="menu"
        autoFocus={true} // eslint-disable-line jsx-a11y/no-autofocus
        closeOnOutsideClick={true}
      >
        <Menu onChange={handleMenuChange} ariaLabel="File operations menu">
          <Menu.Title>File Operations</Menu.Title>
          <Menu.Option value="new">📄 New File</Menu.Option>
          <Menu.Option value="open">📁 Open File</Menu.Option>
          <Menu.Option value="recent">📋 Recent Files</Menu.Option>

          <Menu.Title>Actions</Menu.Title>
          <Menu.Option value="save">💾 Save</Menu.Option>
          <Menu.Option value="export">📤 Export</Menu.Option>
        </Menu>
      </Overlay>

      <Button
        variant="secondary"
        onClick={() => console.log("Second button clicked")}
        style={{ marginLeft: "12px" }}
      >
        Next Button
      </Button>
    </div>
  );
};

export default MenuWithOverlay;
