import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.jsx'
import {Provider} from 'react-redux'
import createStore from './createStore.js'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
