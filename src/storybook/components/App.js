import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
} from 'react-router-dom';

import { useGlobalStateValue } from 'stores';

import * as stories from '../stories';

// import { Nav } from './Nav';
// import { Stage } from './Stage';
// import { Toolbox } from './Toolbox';

import { Splash } from './Splash';
import { Storybook } from './Storybook';

import './App.scss';


console.log('[App] stories: %o', stories);
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


  return (
    <main className="App">
      <Nav stories={stories} />

      <Switch>
        <Route exact path="/">
          <Splash />
        </Route>
        <Route path="/:storyName">
          <Storybook />
        </Route>
      </Switch>
    </main>
  );
}
