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
  const [open, setOpen] = useState(false);


  function handleClick(evt) {
    setOpen(true);
  }

  function handleClose(evt) {
    setOpen(false);
  }


  return (
    <div>
      <button type="button" onClick={handleClick}>
        Open Dialog
      </button>

      <Dialog open={open} onClose={handleClose}>
        <Dialog.Body>
          <p>This is where your content goes...</p>
        </Dialog.Body>

        <Dialog.Actions>
          <button type="button">A button</button>
        </Dialog.Actions>
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

const _chapterProps2 = `{}`;

const _chapterCode2 = `function DialogWithHeader(props) {
  const [open, setOpen] = useState(false);


  function handleClick(evt) {
    setOpen(true);
  }

  function handleClose(evt) {
    setOpen(false);
  }


  return (
    <div>
      <button type="button" onClick={handleClick}>
        Open Dialog
      </button>

      <Dialog open={open} onClose={handleClose}>
        <Header title="Pretty sweet header, huh?" />

        <Dialog.Body>
          <p>And this is where your content goes...</p>
        </Dialog.Body>

        <Dialog.Actions>
          <button type="button">A button</button>
        </Dialog.Actions>
      </Dialog>
    </div>
  );
}`;

story.addChapter({
  id: 'DialogWithHeader',
  title: 'Dialog With Header',
  props: _chapterProps2,
  code: _chapterCode2,
});

const _chapterProps3 = `{}`;

const _chapterCode3 = `function SideDialogWithLoadingAction(props) {
  const pStyles = {
    fontSize: '16px',
    margin: '20px 0',
  };

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);


  function handleClick(evt) {
    setOpen(true);
  }

  function handleClose(evt) {
    setOpen(false);
  }

  function handleModalButtonClick(evt) {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  }


  return (
    <div>
      <button type="button" onClick={handleClick}>
        Open Dialog
      </button>

      <Dialog open={open} onClose={handleClose} enterFrom="right" attach>
        <Backdrop show={loading}>{Backdrop.loadingSvg}</Backdrop>

        <Header title="Side Dialog Header" />

        <Dialog.Body>
          <p style={pStyles}>
            And this is where your content goes. As much or as little
            as you want!
          </p>
          <p style={pStyles}>
            Click the button below to simulate a loading state to simulate
            waiting on an API call, for example.
          </p>
        </Dialog.Body>

        <Dialog.Actions>
          <button type="button" onClick={handleModalButtonClick}>Trigger loading</button>
          <input type="checkbox" />
        </Dialog.Actions>
      </Dialog>
    </div>
  );
}`;

story.addChapter({
  id: 'SideDialogWithLoadingAction',
  title: 'Side Dialog With Loading Action',
  props: _chapterProps3,
  code: _chapterCode3,
});

export default story;
