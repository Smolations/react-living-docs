import React, { useEffect, useState } from 'react'

import getComponentFromString from 'storybook/lib/get-component-from-string';

import { useGlobalStateValue } from 'stores';

import './Stage.scss';


export default function Stage(props) {
  const [{
    app: {
      jsxProps,
      transpiledJsx,
    },
  }] = useGlobalStateValue();
  console.log('[Stage] jsxProps:\n%o', jsxProps);
  console.log('[Stage] transpiledJsx:\n%o', transpiledJsx);

  const [{ Component }, setComponent] = useState({});

  const componentProps = JSON.parse(jsxProps);


  useEffect(() => {
    if (transpiledJsx) {
      // Component is a function so it ends up being executed
      // instead of just stored. we'll store it on an object
      // prop instead to avoid any confusion
      setComponent({ Component: getComponentFromString(transpiledJsx, 'Demo') });
    }
  }, [transpiledJsx]);


  return (
    <section className="Stage">
      <div>
        {Component && (
          <Component {...componentProps} />
        )}
      </div>
    </section>
  );
}
