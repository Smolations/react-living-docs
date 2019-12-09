import PropTypes from 'prop-types';
import React, { useState } from 'react';

// this import will be the tricky bit...needs to change paths
// to the correct path given by the config
// import { Dialog } from './';


export function ConstrainedBackdrop(props) {
  const containerStyles = {
    position: 'relative',
    height: '200px',
    width: '300px',
    marginTop: '10px',
    padding: '10px',
    border: '1px solid gray',
  };

  const [show, setShow] = useState(false);


  function handleButtonClick(evt) {
    setShow(true);
  }

  function handleBackdropClick(evt) {
    setShow(false);
  }


  return (
    <div>
      <button type="button" onClick={handleButtonClick}>
        Show backdrop
      </button>

      <div style={containerStyles}>
        This is just a lil paragraph content. Perhaps we want to obfuscate
        it for a modal or just to hide the content. Note that the backdrop
        element is rendered the entire time, but does not obfuscate the
        underlying content unless it's open.
        <br />
        <input type="text" />

        <Backdrop show={show} onClick={handleBackdropClick}>
          <p style={{color: 'white'}}>
            Click me to close!
          </p>
        </Backdrop>
      </div>
    </div>
  );
}


export function FullScreenBackdrop(props) {
  const [show, setShow] = useState(false);


  function handleButtonClick(evt) {
    setShow(true);
  }

  function handleBackdropClick(evt) {
    setShow(false);
  }


  return (
    <div>
      <button type="button" onClick={handleButtonClick}>
        Show backdrop
      </button>

      <Backdrop show={show} onClick={handleBackdropClick} fullScreen>
        <p style={{color: 'white'}}>
          Click me to close!
        </p>
      </Backdrop>
    </div>
  );
}
