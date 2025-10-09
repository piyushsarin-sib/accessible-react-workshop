import React from 'react';
import { useOverlay } from '@lib/Overlay';
import Modal from '@lib/Modal';
import Button from '@common/Button';

const ModalExample = () => {
  const modalDisclosure = useOverlay({
    style: { width: '400px' },
    bodyId: 'modal-overlay',
    triggerId: 'modal-overlay-trigger',
  });

  const handleSave = () => {
    console.log('Save clicked');
    modalDisclosure.close();
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
    modalDisclosure.close();
  };

  return (
    <div style={{ padding: '50px', minHeight: '150vh' }}>
      <h3 style={{ marginBottom: '20px' }}>Modal Example</h3>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Click to open a modal dialog with backdrop. ESC to close, or click backdrop.
      </p>
      <p style={{ marginBottom: '20px', color: '#666', fontSize: '14px' }}>
        <strong>Accessibility features:</strong>
        <br />• Scroll lock (background won't scroll when modal is open)
        <br />• Background content is inert (can't interact with page behind modal)
        <br />• Focus trap (Tab cycles only through modal buttons)
        <br />• Focus restoration (focus returns to trigger button on close)
      </p>

      <Button
        {...modalDisclosure.trigger}
        onClick={modalDisclosure.toggle}
        variant="primary"
      >
        Open Modal
      </Button>

      {/* Dummy buttons to demonstrate inert behavior */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexDirection: 'column', maxWidth: '300px' }}>
        <Button variant="secondary" onClick={() => console.log('Background button 1 clicked')}>
          Background Button 1
        </Button>
        <Button variant="secondary" onClick={() => console.log('Background button 2 clicked')}>
          Background Button 2
        </Button>
        <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>
          ↑ Try clicking these when modal is open (they won't work due to inert)
        </p>
      </div>

      {/* Dummy content to enable scrolling */}
      <div style={{ marginTop: '40px' }}>
        <h4>Scroll down to see more content</h4>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} style={{ marginBottom: '20px', color: '#999' }}>
            Paragraph {i + 1}: This is dummy content to demonstrate scroll lock.
            When the modal is open, you won't be able to scroll this page.
          </p>
        ))}
      </div>

      <Modal {...modalDisclosure} title="Confirm Action">
        <p style={{ margin: '0 0 24px 0', color: '#666' }}>
          Are you sure you want to proceed with this action? This cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button onClick={handleCancel} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="primary">
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalExample;