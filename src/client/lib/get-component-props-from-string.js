// here we import all components that are documented in storybook. this
// allows for the story components to use them in rendered markup.
// @todo this will need to be dynamic..or maybe copy given directory?
// wait, is this needed?
import * as components from '../../components';


export default function getComponentPropsFromString(str, storyChapter) {
  console.groupCollapsed('[getComponentPropsFromString]');
  console.log('str: %o', str);
  console.log('storyChapter: %o', storyChapter);

  // `globals`` and `stringGlobals` should mirror each other. the strings
  // are necessary as they are required when creating a new `Function`
  // from a string.
  const stringGlobals = [...Object.keys(components)];
  const globals = [...Object.values(components)];

  // ensuring no dupes; don't trust _.uniq to remove
  // them properly...
  Object.keys(storyChapter.globals).forEach((globalKey) => {
    if (!stringGlobals.includes(globalKey)) {
      stringGlobals.push(globalKey);
      globals.push(storyChapter.globals[globalKey]);
    }
  });

  // const componentNamePattern = new RegExp(`(?=function ${storyChapter.id})`);

  const scopedFunction = Function(...stringGlobals, `return ${str};`);
  console.log('scopedFunction:\n%o', scopedFunction.toString());

  const props = scopedFunction(...globals);
  console.log('props:\n%o', props);

  console.groupEnd();
  return props;
}