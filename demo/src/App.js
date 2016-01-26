import React, { Component } from 'react';
import { createStore, combineReducers, bindActionCreators } from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';
import Main from './Main'

const reducer = combineReducers({
  main: reducers
});

const store = createStore(reducer, {});

if (module && module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    store.replaceReducer(reducer)
  })
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    );
  }
}
