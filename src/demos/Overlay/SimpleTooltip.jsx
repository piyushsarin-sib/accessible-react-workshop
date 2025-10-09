import React from 'react';
import { useOverlay, Overlay, PLACEMENTS } from '@lib/Overlay';
import Button from '@common/Button';

const SimpleTooltip = () => {
  const tooltipDisclosure = useOverlay({
    placement: PLACEMENTS.TOP,
    pattern: 'tooltip',
    style: {
      padding: '8px 12px',
      fontSize: '14px',
      backgroundColor: '#333',
      color: 'white',
    },
    bodyId: 'simple-tooltip',
    triggerId: 'tooltip-button',
  });

  return (
    <div style={{ padding: '100px' }}>
      <h3>Simple Tooltip</h3>

      <Button
        {...tooltipDisclosure.trigger}
        onClick={tooltipDisclosure.toggle}
        variant="primary"
      >
        Click for tooltip
      </Button>

      <Overlay
        {...tooltipDisclosure}
        pattern="tooltip"
        autoFocus={false} // eslint-disable-line jsx-a11y/no-autofocus
        elevation={false}
        border={false}
      >
        <div>This is a tooltip!</div>
      </Overlay>
    </div>
  );
};

export default SimpleTooltip;