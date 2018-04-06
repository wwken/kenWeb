// import React from 'react';
// import ReactDOM from 'react-dom';
// import { App } from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './App'
import configureStore from './store/configureStore'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import './index.css'

const store = configureStore()
render(
<Provider store={store}>
  <App />
  </Provider>,
document.getElementById('root')
)
