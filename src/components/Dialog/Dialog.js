import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Backdrop } from '../Backdrop';

import './Dialog.scss';


export default function Dialog(props) {
  const {
    children,
    className,
    onClose,
    open,
  } = props;

  const classes = classNames('Dialog', {
    'Dialog--open': open,
  }, className);

  const [showBackdrop, setShowBackdrop] = useState(!!open);


  function handleBackdropClick() {
    setShowBackdrop(false);
    onClose();
  }


  useEffect(() => {
    open && setShowBackdrop(true);
  }, [open]);


  return (
    <Backdrop show={showBackdrop} onClick={handleBackdropClick} fullScreen>
      {open && (
        <div className={classes}>
          {children}
        </div>
      )}
    </Backdrop>
  );
}


Dialog.propTypes = {
  onClose: PropTypes.func,
};

Dialog.defaultProps = {
  onClose: () => {},
};
