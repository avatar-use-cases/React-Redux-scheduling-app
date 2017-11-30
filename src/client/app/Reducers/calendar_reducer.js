import { ADD_EVENT, ADD_EVENTS, REMOVE_EVENT, SET_EVENTS_ASYNCH, CREATE_EVENT_ERROR, CLEAR_EVENTS} from '../ActionTypes/calendar_actions.js'
import { REQUEST_ERROR, REQUEST_SUCCESS, REQUEST_PENDING } from '../ActionTypes/asynchronous_actions'



const initialState = {
  isFetching : false,
  isEvent: false,
  activeCalendar : [],
  fetchErrorMessage : '',
  createErrorMessage: ''
}
function calendar(state = initialState, action) {
  switch (action.type) {
      case CLEAR_EVENTS:
          return {
            ...state,
            activeCalendar : []
          }
      case REMOVE_EVENT:
          return {
              ...state,
              activeCalendar : state.activeCalendar.filter(event=>event.eventId !== action.event.eventId)
          }
      case ADD_EVENT:
        return{
            ...state,
            activeCalendar : [...state.activeCalendar, action.event],
            createErrorMessage: '',
            isEvent: true
        }
        case ADD_EVENTS:
          return {
              ...state,
              activeCalendar : action.events,
              isEvent: true,
              createErrorMessage: ''
          }
    case CREATE_EVENT_ERROR:
        return {
            ...state,
          createErrorMessage: action.error_message
        }
    case REQUEST_SUCCESS:
      return {
        ...state,
        fetchErrorMessage: '',
        isFetching : false
      }
    case REQUEST_PENDING:
          return {
            ...state,
            isFetching : true,
            fetchErrorMessage : ""
          }
    case REQUEST_ERROR:
          return {
            ...state,
            fetchErrorMessage: action.error_message,
            isFetching : false
          }
    default:
      return state;
  }
}

export default calendar
