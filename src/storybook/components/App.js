import React from 'react';

import { Nav } from './Nav';
import { Stage } from './Stage';
import { Toolbox } from './Toolbox';

import stories from 'components/stories';

import './App.scss';


export default function App() {
  return (
    <main className="App">
      <Nav stories={stories} />
      <Stage />
      <Toolbox />
    </main>
  );
}
