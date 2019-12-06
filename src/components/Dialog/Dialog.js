import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import DialogBackdrop from './DialogBackdrop';


export default function Dialog(props) {
  const {
    parent,
    children,
  } = props;

  const rootNode = parent ? parent : document.querySelector('body');

  const [dialogElement] = useState(document.createElement('article'));

  dialogElement.className = 'Dialog';


  useEffect(() => {
    rootNode.appendChild(dialogElement);

    return () => rootNode.removeChild(dialogElement);
  }, []);


  return ReactDOM.createPortal(
    children,
    dialogElement,
  );

  // return (
  //   <article className="Dialog">
  //     {children}
  //   </article>
  // );
}


Dialog.propTypes = {};
