import React, { useEffect, useState } from 'react';

// import stories from 'components/stories';

import { useGlobalStateValue } from 'stores';

import { Nav } from './Nav';
import { Stage } from './Stage';
import { Toolbox } from './Toolbox';

import * as stories from '../stories';
import './App.scss';


export default function App() {
  const [{
    app: {
      jsx,
      jsxProps,
      selectedChapter,
      transpiledJsx,
    },
  }] = useGlobalStateValue();

  const componentName = selectedChapter ? selectedChapter.id : null;

  // const [stories, setStories] = useState([]);
  console.log('[App] stories: %o', stories);

  // useEffect(() => {
  //   fetch('//localhost:8080/stories', {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //   })
  //     .then(resp => resp.json())
  //     .then((json) => {
  //       setStories(json.stories);
  //     });
  // }, []);


  return (
    <main className="App">
      <Nav stories={stories} />
      {selectedChapter && <Stage componentName={componentName} componentJsx={jsx} componentProps={jsxProps} />}
      {selectedChapter && <Toolbox jsx={jsx} jsxProps={jsxProps} />}
    </main>
  );
}
