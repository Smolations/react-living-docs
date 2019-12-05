import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import getComponentFromString from 'lib/get-component-from-string';

import { useGlobalStateValue } from 'stores';

import './Stage.scss';


export default function Stage(props) {
  const { componentJsx, componentProps } = props;
  const [{
    app: {
      selectedChapter,
    },
  }] = useGlobalStateValue();
  console.groupCollapsed('[Stage]');
  console.log('componentProps:\n%o', componentProps);
  console.log('componentJsx:\n%o', componentJsx);
  console.log('selectedChapter: %o', selectedChapter);

  const [{ Component }, setComponent] = useState({});
  const [isLoadingTranspiledJsx, setIsLoadingTranspiledJsx] = useState(false);
  console.log('Component: %o', Component);

  const parsedComponentProps = JSON.parse(componentProps);
  console.log('parsedComponentProps: %o', parsedComponentProps);


  function fetchTranspiledJsx() {
    setIsLoadingTranspiledJsx(true);

    return fetch('//localhost:8080/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ jsx: componentJsx }),
    })
      .then(resp => resp.json())
      .then((json) => {
        const { transpiledJsx } = json;

        setIsLoadingTranspiledJsx(false);

        return transpiledJsx;
      });
  }


  useEffect(() => {
    if (componentJsx) {
      // Component is a function so it ends up being executed
      // instead of just stored. we'll store it on an object
      // prop instead to avoid any confusion
      fetchTranspiledJsx()
        .then((transpiledJsx) => {
          setComponent({ Component: getComponentFromString(transpiledJsx, selectedChapter) });
        });
    }
  }, [componentJsx]);


  console.groupEnd();
  return (
    <section className="Stage">
      <div>
        {!isLoadingTranspiledJsx && Component && (
          <Component {...parsedComponentProps} />
        )}
      </div>
    </section>
  );
}


Stage.defaultProps = {
  componentProps: '{}',
};
