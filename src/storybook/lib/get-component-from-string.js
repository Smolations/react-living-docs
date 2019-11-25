// here we import all components that are documented in storybook. this
// allows for the story components to use them in rendered markup.
import * as components from 'components';

// these are core packages, utilities, etc., which will make them
// accessible in story components.
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
console.log('[getComponentFromString] components.Card.toString():\n%o', components.Card.toString())

export default function getComponentFromString(str, componentName) {
  console.groupCollapsed('[getComponentFromString]');
  console.log('str: %o', str);
  console.log('componentName: %o', componentName);
  // `globals`` and `stringGlobals` should mirror each other. the strings
  // are necessary as they are required when creating a new `Function`
  // from a string.
  const globals = [
    _,
    moment,
    React,
    useEffect,
    useState,
    ...Object.values(components),
  ];

  const stringGlobals = [
    '_',
    'moment',
    'React',
    'useEffect',
    'useState',
    Object.keys(components),
  ];

  const componentNamePattern = new RegExp(`(?=function ${componentName})`);

  const scopedFunction = Function(...stringGlobals, str.replace(componentNamePattern, 'return '));
  console.log('scopedFunction:\n%o', scopedFunction.toString());

  const Component = scopedFunction(...globals);
  console.log('Component:\n%o', Component);

  console.groupEnd();
  return Component;
}
