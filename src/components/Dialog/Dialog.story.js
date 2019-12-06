import React from 'react';

import { Dialog } from './';


export function SimpleDialog(props) {
  const containerStyles = {
    position: 'relative';
    height: '200px';
    border: '1px solid gray';
  };


  return (
    <div style={containerStyles}>
      <button type="button" onClick={handleClick}>
        Open Side Dialog
      </button>

      <Dialog>
        <Dialog.Head>
          <h3>Pretty sweet, huh?</h3>
        </Dialog.Head>

        <Dialog.Body>
          <p>And this is where your content goes...</p>
        </Dialog.Body>

        <Dialog.Foot>
          <button type="button">A button</button>
        </Dialog.Foot>
      </Dialog>
    </div>
  );
}
