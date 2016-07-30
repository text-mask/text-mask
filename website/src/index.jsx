import ReactDOM from 'react-dom'
import React from 'react' // eslint-disable-line
import App from './app.jsx' // eslint-disable-line
import {Provider} from 'react-redux'
import createStore from './createStore.js'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
