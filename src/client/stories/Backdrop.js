import Story from 'lib/story';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const globals = {
  PropTypes,
  React,
  useState,
};

const story = new Story('Backdrop', {
  globals,
});

const _chapterProps = `{}`;

const _chapterCode = `function ConstrainedBackdrop(props) {
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
}`;

story.addChapter({
  id: 'ConstrainedBackdrop',
  title: 'Constrained Backdrop',
  props: _chapterProps,
  code: _chapterCode,
});

const _chapterProps2 = `{}`;

const _chapterCode2 = `function FullScreenBackdrop(props) {
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
}`;

story.addChapter({
  id: 'FullScreenBackdrop',
  title: 'Full Screen Backdrop',
  props: _chapterProps2,
  code: _chapterCode2,
});

export default story;
