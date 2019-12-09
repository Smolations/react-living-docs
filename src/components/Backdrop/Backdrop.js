import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.scss';


export default function Backdrop(props) {
  const {
    children,
    fullScreen,
    onClick,
    parent,
    show,
  } = props;

  const classes = classNames('Backdrop', {
    'Backdrop--open': show,
    'Backdrop--targeted': !!parent,
  });

  let rootNode;

  const [backdropElement] = useState(document.createElement('div'));
  const [nonFullscreenBackdropElementRef] = useState(React.createRef());


  if (parent) {
    rootNode = parent;

    if (typeof parent === 'string') {
      rootNode = document.querySelector(parent);
    }
  } else if (fullScreen) {
    rootNode = document.querySelector('body');
  }


  function handleClick(evt) {
    const targetIsFullscreenBackdrop = (evt.target === backdropElement);
    const targetIsLocalBackdrop = (evt.target === nonFullscreenBackdropElementRef.current);
    const targetIsBackdrop = targetIsFullscreenBackdrop || targetIsLocalBackdrop;

    if (show && targetIsBackdrop) {
      evt.preventDefault();
      onClick(evt);
    }
  }


  backdropElement.className = classes;
  backdropElement.onclick = handleClick;


  useEffect(() => {
    rootNode && rootNode.appendChild(backdropElement);

    return () => rootNode && rootNode.removeChild(backdropElement);
  }, []);


  return rootNode
    ? ReactDOM.createPortal(
      children,
      backdropElement,
    )
    : (
      <div ref={nonFullscreenBackdropElementRef} className={classes} onClick={handleClick}>
        {children}
      </div>
    );
}


Backdrop.propTypes = {};

Backdrop.defaultProps = {
  onClick: () => {},
};
