import { useState, useCallback, useMemo, useRef } from 'react';
import { flattenProps } from '../helpers/flattenProps';

const useOverlay = (props = {}) => {
  const triggerRef = useRef();
  const bodyRef = useRef();

  const {
    visible: _visible = false,
    triggerId,
    bodyId,
    pattern = 'menu',
    ...restBodyProps
  } = props;
  const [visible, setVisible] = useState(_visible);

  const open = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const close = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const toggle = useCallback(() => {
    let newState = false;
    setVisible((prevState) => {
      newState = !prevState;
      return newState;
    });
    return newState;
  }, [setVisible]);

  // Dynamic aria-haspopup based on pattern
  const getAriaHasPopup = (pattern) => {
    const patternMap = {
      'menu': 'menu',
      'dialog': 'dialog',
      'modal': 'dialog',
      'listbox': 'listbox',
      'tooltip': 'true',
      'popover': 'true',
    };
    return patternMap[pattern] || 'true';
  };

  const aria = {
    'aria-expanded': visible,
    'aria-haspopup': getAriaHasPopup(pattern),
    'aria-controls': bodyId,
  };

  const {
    className,
    style = {},
    elevation,
    border,
    flip,
    animate,
    placement,
  } = restBodyProps;

  const stringifiedStyle = JSON.stringify(style); // stringification is affordable here since style would not be a very heavy or complex object.

  const trigger = useMemo(
    () =>
      flattenProps({
        id: triggerId,
        ref: triggerRef,
        aria,
        data: {},
      }),
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [triggerId, triggerRef, visible, bodyId, pattern],
  );

  const body = useMemo(
    () =>
      flattenProps({
        ...restBodyProps,
        id: bodyId,
        ref: bodyRef,
        visible,
        aria: {},
        data: {},
      }),
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [
      bodyRef,
      className,
      stringifiedStyle,
      visible,
      elevation,
      border,
      flip,
      animate,
      placement,
    ],
  );

  const disclosure = {
    trigger,
    body,
    open,
    close,
    toggle,
    setVisible,
  };

  return disclosure;
};

export default useOverlay;