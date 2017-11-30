import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'
import { Provider } from 'react-redux'
import reducer from './Reducers/reducer'
import { fetchEvents } from './ActionTypes/calendar_actions'
import { getUsersAsynch  } from './ActionTypes/user_level_actions'
import UserContainer from './Containers/user_container'

class App extends Component {
  render() {
    return (
      <div>
        <UserContainer />
      </div>
    )
  }
}
let logger = createLogger();
let store = createStore(reducer, compose(applyMiddleware(thunk, logger)))
store.dispatch(getUsersAsynch());
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'));
