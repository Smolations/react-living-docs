import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  useParams,
  useLocation,
} from 'react-router-dom';

import { useGlobalStateValue } from 'stores';

// import { Nav } from '../Nav';
import { Stage } from '../Stage';
import { Toolbox, ToolboxDragHandle } from '../Toolbox';

import { setSelectedChapter, setSelectedStory } from 'stores/app/actions';


import './Storybook.scss';


export default function Storybook(props) {
  const { stories } = props;
  const [{
    app: {
      jsx,
      jsxProps,
      selectedChapter,
    },
  }, dispatch] = useGlobalStateValue();

  console.log('[Storybook] useLocation(): %o',  useLocation())
  const { hash } = useLocation();
  const { storyName } = useParams();
  let chapterId;


  if (hash) {
    chapterId = hash.slice(1);
  }


  useEffect(() => {
    const story = stories[storyName];
    console.log('[Storybook] set selected story: %o', story)
    dispatch(setSelectedStory(story));

    if (chapterId) {
      console.log('[Storybook] set selected chapter(%o): %o', chapterId, story.findChapter(chapterId))
      dispatch(setSelectedChapter(story.findChapter(chapterId)));
    }
  }, [storyName, chapterId]);


  return (
    <main className="Storybook">
      <Stage componentJsx={jsx} componentProps={jsxProps} />
      <ToolboxDragHandle />
      <Toolbox jsx={jsx} jsxProps={jsxProps} />
    </main>
  );
}
