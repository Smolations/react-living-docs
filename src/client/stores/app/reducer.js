import isString from 'lodash/isString';

import appConstants from './constants';


export default function appReducer(state, action) {
  const { payload } = action;
  let newState;

  switch (action.type) {
    // this sets the jsx which is displayed in the code editor
    case appConstants.JSX_UPDATE:
      newState = {
        ...state,
        jsx: payload,
      };
      break;

    // this sets the props which are displayed in the code editor
    case appConstants.JSX_PROPS_UPDATE:
      newState = {
        ...state,
        jsxProps: isString(payload) ? payload : JSON.stringify(payload),
      };
      break;

    case appConstants.SELECTED_CHAPTER_UPDATE: {
      // const chapter = state.selectedStory.findChapter(payload);
      // console.log('[SELECTED_CHAPTER_UPDATE] selectedStory(%o)  chapter(%o)', state.selectedStory, chapter);

      newState = {
        ...state,
        selectedChapter: payload,
        jsx: payload.code,
        jsxProps: payload.props,
      };
    } break;

    case appConstants.SELECTED_STORY_UPDATE:
      newState = {
        ...state,
        selectedStory: payload,
      };
      break;

    // this sets the transpiled jsx that gets rendered
    // on the Stage
    case appConstants.TRANSPILED_JSX_UPDATE:
      newState = {
        ...state,
        transpiledJsx: payload,
      };
      break;

    default:
      newState = state;
  }

  return { ...newState, isInitialState: false };
}
