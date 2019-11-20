import React, { useEffect, useState } from 'react';

import { Nav } from './Nav';
import { Stage } from './Stage';
import { Toolbox } from './Toolbox';

import stories from 'components/stories';

import './App.scss';


export default function App() {
  const [stories, setStories] = useState([]);
  console.log('[App] stories: %o', stories);

  useEffect(() => {
    fetch('//localhost:8080/stories', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(resp => resp.json())
      .then((json) => {
        const { transpiledJsx } = json;
        setStories(json.stories);
      });
  }, []);


  return (
    <main className="App">
      <Nav stories={stories} />
      <Stage />
      <Toolbox />
    </main>
  );
}
