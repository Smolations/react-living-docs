import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import App from './components/App';
import {
  GlobalStateProvider,
  globalInitialState,
  globalReducer,
} from '../stores';

import './index.scss';


const appContainer = (
  <GlobalStateProvider initialState={globalInitialState} reducer={globalReducer}>
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Route path="/" component={App} />
      </QueryParamProvider>
    </Router>
  </GlobalStateProvider>
);


ReactDOM.render(appContainer, document.querySelector('#storybook'));
