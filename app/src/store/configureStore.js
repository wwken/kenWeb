import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../_reducers'

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore)

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../_reducers', () => {
      const nextReducer = require('../_reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
