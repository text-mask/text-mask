import {createStore} from 'redux'
import {reducer} from './redux'

export default function configureStore() {
  const store = createStore(reducer)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./redux.js', () => {
      const nextRootReducer = require('./redux.js').reducer

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
