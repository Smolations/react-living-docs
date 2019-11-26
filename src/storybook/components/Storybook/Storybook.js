import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  useParams,
} from 'react-router-dom';

import { useGlobalStateValue } from 'stores';

// import * as stories from '../../stories';

// import { Nav } from '../Nav';
import { Stage } from '../Stage';
import { Toolbox } from '../Toolbox';


export default function Storybook() {
  const [{
    app: {
      jsx,
      jsxProps,
      selectedChapter,
      transpiledJsx,
    },
  }] = useGlobalStateValue();

  const params = useParams();
  console.log('[Storybook] useParams(): %o', params)
  // const { slug: storyName } = useParams();


  return (
    <main className="Storybook">
      <Stage componentJsx={jsx} componentProps={jsxProps} />
      <Toolbox jsx={jsx} jsxProps={jsxProps} />
    </main>
  );
}
