import React from 'react';

// import { SideDialog } from './';


export function SideDialogInContainer(props) {
  const containerStyles = {
    position: 'relative',
    height: '200px',
    border: '1px solid gray',
  };


  function handleClick(evt) {
    console.log('click!');
  }


  return (
    <div style={containerStyles}>
      <button type="button" onClick={handleClick}>
        Open Side Dialog
      </button>

      <SideDialog>
        <SideDialog.Head>
          <h3>Pretty sweet, huh?</h3>
        </SideDialog.Head>

        <SideDialog.Body>
          <p>And this is where your content goes...</p>
        </SideDialog.Body>

        <SideDialog.Foot>
          <button type="button">A button</button>
        </SideDialog.Foot>
      </SideDialog>
    </div>
  );
}
