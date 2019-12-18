import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Backdrop } from '../Backdrop';
import { Flex } from '../Flex';

import './Dialog.scss';


export default function Dialog(props) {
  const {
    attach,
    children,
    className,
    enterFrom,
    onClose,
    open,
  } = props;

  const origins = ['top', 'bottom', 'left', 'right'];

  if (!origins.includes(enterFrom)) {
    throw new Error('[Dialog] Must provide valid value for "enterFrom" prop!');
  }

  const classes = classNames('Dialog', `Dialog--from-${enterFrom}`, {
    'Dialog--open': open,
    'Dialog--attached': attach,
  }, className);

  // default header size according to comps matches with h2,
  // so be sure to set it if not already set
  const newChildren = React.Children.map(children, (child) => {
    const { children: childChildren, ...otherChildProps } = child.props;
    if (child.type.displayName === 'Header' && !otherChildProps.size) {
      // big header for side dialogs, lil smaller for normal dialogs
      otherChildProps.size = attach ? 1 : 2;

      return React.cloneElement(child, otherChildProps, childChildren);
    }

    return child;
  });

  const [showBackdrop, setShowBackdrop] = useState(!!open);
  // console.log('[Backdrop] open: %o', open)
  // console.log('[Backdrop] showBackdrop: %o', showBackdrop)

  function handleBackdropClick() {
    // console.log('[Backdrop] handleBackdropClick showBackdrop false', open)
    setShowBackdrop(false);
    onClose();
  }


  useEffect(() => {
    // console.log('[Backdrop] useEffect setShowBackdrop(%o)', open)
    setShowBackdrop(open);
  }, [open]);


  return (
    <Backdrop show={showBackdrop} onClick={handleBackdropClick} fullScreen>
      <Flex
        className={classes}
        flexDirection="column"
        flexGrow={0}
      >
        {newChildren}
      </Flex>
    </Backdrop>
  );
}


Dialog.propTypes = {
  enterFrom: PropTypes.string,
  onClose: PropTypes.func,
};

Dialog.defaultProps = {
  onClose: () => {},
  enterFrom: 'bottom',
};
