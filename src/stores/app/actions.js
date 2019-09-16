import appConstants from './constants';


/**
 *  Update transpiled JSX
 *
 *  @action
 *  @param {string} str The transpiled JSX string.
 *
 *  @returns {object} Action object with payload being the transpiled jsx string.
 */
export function setTranspiledJsx(str) {
  return {
    type: appConstants.TRANSPILED_JSX_UPDATE,
    payload: str,
  };
}


export function setJsx(str) {
  return {
    type: appConstants.JSX_UPDATE,
    payload: str,
  };
}


export function setJsxProps(str) {
  return {
    type: appConstants.JSX_PROPS_UPDATE,
    payload: str,
  };
}

