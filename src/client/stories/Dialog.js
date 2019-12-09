import Story from 'lib/story';
import React, { useEffect, useState }from 'react';

const globals = {
  React,
  useEffect,
  useState,
};

const story = new Story('Dialog', {
  globals,
});

const _chapterProps = `{}`;

const _chapterCode = `function SimpleDialog(props) {
  const containerStyles = {
    position: 'relative',
    height: '200px',
    border: '1px solid gray',
  };

  const [open, setOpen] = useState(false);


  function handleClick(evt) {
    setOpen(true);
  }

  function handleClose(evt) {
    setOpen(false);
  }


  return (
    <div style={containerStyles}>
      <button type="button" onClick={handleClick}>
        Open Side Dialog
      </button>

      <Dialog open={open} onClose={handleClose}>
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
}`;

story.addChapter({
  id: 'SimpleDialog',
  title: 'Simple Dialog',
  props: _chapterProps,
  code: _chapterCode,
});

export default story;
