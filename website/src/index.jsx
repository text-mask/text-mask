import ReactDOM from 'react-dom'
import React from 'react' // eslint-disable-line
import App from './app.jsx' // eslint-disable-line
import {store} from './redux.js'
import {Provider} from 'react-redux'

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('app')
)
