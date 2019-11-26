import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// ace editor and themes, modes, etc
import ace from 'ace-builds/src-min-noconflict/ace';
import 'ace-builds/src-min-noconflict/mode-javascript';
import 'ace-builds/src-min-noconflict/mode-json';
import 'ace-builds/src-min-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';

// import prettier from 'prettier/standalone';
// import parserBabylon from 'prettier/parser-babylon';
import { js as jsBeautify } from 'js-beautify';

import { useGlobalStateValue } from 'stores';
import {
  setJsx,
  setJsxProps,
  setTranspiledJsx,
} from 'stores/app/actions';

import './Toolbox.scss';


export default function Toolbox(props) {
  const { jsx, jsxProps } = props;

  const [jsxEditor, setJsxEditor] = useState(null);
  const [propsEditor, setPropsEditor] = useState(null);
  const [, dispatch] = useGlobalStateValue();

  const jsxEditorId = 'jsxEditor';
  const propsEditorId = 'propsEditor';
  const editorTheme = 'ace/theme/monokai';
  const globalSessionOptions = {
    tabSize: 2,
  };

  const globalBeautifyOptions = {
    indent_size: 2,
  };


  function setEditorOptions() {
    const JavaScriptMode = ace.require('ace/mode/javascript').Mode;
    const JsonMode = ace.require('ace/mode/json').Mode;

    jsxEditor.setTheme(editorTheme);
    propsEditor.setTheme(editorTheme);

    jsxEditor.session.setMode(new JavaScriptMode());
    propsEditor.session.setMode(new JsonMode());

    jsxEditor.getSession().setOptions(globalSessionOptions);
    propsEditor.getSession().setOptions(globalSessionOptions);
  }

  function setEditorJsx(newJsx) {
    jsxEditor && jsxEditor.getSession().setValue(jsx);
  }

  function setEditorProps(newProps) {
    propsEditor && propsEditor.getSession().setValue(jsBeautify(jsxProps, globalBeautifyOptions));
  }


  function handleReload() {
    const newJsx = jsxEditor.getValue();
    console.log('[Toolbox] newJsx: %o', newJsx);

    const newJsxProps = propsEditor.getValue();
    console.log('[Toolbox] newJsxProps: %o', newJsxProps);

    dispatch(setJsx(newJsx));
    dispatch(setJsxProps(newJsxProps));
  }


  // first, initialize the editors
  useEffect(() => {
    setJsxEditor(ace.edit(jsxEditorId));
    setPropsEditor(ace.edit(propsEditorId));
  }, []);

  // once editors are set up and the Toolbox re-renders,
  // set up themes, modes, etc. and set content
  useEffect(() => {
    if (jsxEditor && propsEditor) {
      setEditorOptions();

      setEditorJsx(jsx);
      setEditorProps(jsxProps);
    }
  }, [jsxEditor, propsEditor]);

  // now watch for the changes to jsx so the transpiled
  // jsx can be fetched. this will trigger when the jsx
  // is initially passed in, so the component will render
  // on page load
  useEffect(() => {
    if (jsx) {
     setEditorJsx(jsx);
    }
  }, [jsx]);

  useEffect(() => {
    console.log('[Toolbox] useEffect jsxProps changed: %o', jsxProps);
    setEditorProps(jsxProps);
  }, [jsxProps]);


  return (
    <section className="Toolbox">
      <div id="editors">
        <div id={jsxEditorId}></div>
        <div id={propsEditorId}></div>
      </div>

      <button type="button" style={{ float: 'right' }} onClick={handleReload}>
        Reload
      </button>
    </section>
  );
}
