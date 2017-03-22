import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {Provider} from 'react-redux'
import createStore from './createStore'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
