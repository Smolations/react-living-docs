import React, { useEffect, useState } from 'react';

import './ToolboxDragHandle.scss';


export default function ToolBoxDragHandle() {
  const [handleRef] = useState(React.createRef());
  const [mousePosition, setMousePosition] = useState();
  const [resizeElement, setResizeElement] = useState(null);
  // console.log('[ToolboxDragHandle] handleRef: %o', handleRef)
  // console.log('[ToolboxDragHandle] resizeElement: %o', resizeElement)


  function handleMouseMove(evt) {
    console.groupCollapsed('[handleMouseMove]')
    const dx = mousePosition - evt.x;

    const resizeElementComputedStyle = getComputedStyle(resizeElement);
    console.log('resizeElementComputedStyle: %o', resizeElementComputedStyle);

    const resizeElementWidthInt = parseInt(resizeElementComputedStyle.width, 10);
    console.log('resizeElementWidthInt: %o', resizeElementWidthInt);

    const newWidth = `${resizeElementWidthInt + dx}px`;
    console.log('newWidth: %o', newWidth);

    resizeElement.style.width = newWidth;

    setMousePosition(evt.x);
    console.groupEnd();
  }

  function handleMouseDown(evt) {
    console.log('handleMouseDown');
    setMousePosition(evt.x);

    document.addEventListener('mousemove', handleMouseMove);
  }

  function handleMouseUp(evt) {
    console.log('handleMouseUp');
    document.removeEventListener('mousemove', handleMouseMove);
  }



  useEffect(() => {
    let newResizeElement;

    if (handleRef.current) {
      newResizeElement = handleRef.current.nextSibling;
      console.log('newResizeElement: %o', newResizeElement)

      document.addEventListener('mousedown', handleMouseDown);
      // newResizeElement.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);

      setResizeElement(newResizeElement);
    }

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      // newResizeElement.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [handleRef.current]);


  return (<div id="ToolboxDragHandle" ref={handleRef} />);
}
