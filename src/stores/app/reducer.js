import appConstants from './constants';


export default function appReducer(state, action) {
  const { payload } = action;
  let newState;

  switch (action.type) {
    case appConstants.JSX_UPDATE:
      newState = {
        ...state,
        jsx: payload,
      };
      break;

    case appConstants.JSX_PROPS_UPDATE:
      newState = {
        ...state,
        jsxProps: payload,
      };
      break;

    case appConstants.TRANSPILED_JSX_UPDATE:
      newState = {
        ...state,
        transpiledJsx: payload,
      };
      break;

    default:
      newState = state;
  }

  return newState;
}
