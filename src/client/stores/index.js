import PropTypes from 'prop-types';
import React, {
  createContext,
  useContext,
  useReducer,
} from 'react';


// for convenience, re-export other state stuff here
export { default as globalInitialState } from './initial-state';
export { default as globalReducer } from './reducer';

// exported for use in class-based components (but please don't unless you have to)
export const GlobalStateContext = createContext();

// grab this within components to access state
export const useGlobalStateValue = () => useContext(GlobalStateContext);


// main export used to wrap other components to make them state-aware
export const GlobalStateProvider = ({
  reducer, initialState, children,
}) => (
  <GlobalStateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </GlobalStateContext.Provider>
);


// boilerplate; will be the same for any hook-based, localized state files
GlobalStateProvider.propTypes = {
  children: PropTypes.object.isRequired,
  initialState: PropTypes.object.isRequired,
  reducer: PropTypes.func.isRequired,
};
