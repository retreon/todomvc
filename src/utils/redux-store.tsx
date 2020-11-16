import { createStore, applyMiddleware, compose } from 'redux';
import { middleware } from 'retreon';

import reducer, { initialState } from '../reducers/tasks';

// This enables integration with the redux-devtools browser extension:
// https://github.com/reduxjs/redux-devtools
const DEVTOOLS_KEY = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';

declare global {
  interface Window {
    [DEVTOOLS_KEY]?: typeof compose;
  }
}

export function initializeStore(hydrate?: typeof initialState) {
  const composeEnhancers = window[DEVTOOLS_KEY] || compose;
  const enhancer = composeEnhancers(applyMiddleware(middleware));
  return createStore(reducer, hydrate, enhancer);
}

export default initializeStore();
