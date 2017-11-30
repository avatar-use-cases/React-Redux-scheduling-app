import { combineReducers } from 'redux'
import calendar from './calendar_reducer'
import user from './user_reducer'

export default combineReducers({
  user,
  calendar
})
