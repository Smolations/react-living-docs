import { appReducer } from './app';


// any time a new object is added to global state, this reducer's
// signature should be modified so that the new object's key is
// included in the destructured first param. And obviously the
// returned state object should be modified to add that object
// as well.
export default function globalReducer({ app }, action) {
  return {
    app: appReducer(app, action),
  };
}
