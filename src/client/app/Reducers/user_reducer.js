import { LOGIN_USER, LOGOUT_USER, SET_FULL_NAME, SET_ALL_USERS, ADD_INTEREST, REMOVE_INTEREST  } from '../ActionTypes/user_level_actions'
import { REQUEST_ERROR, REQUEST_SUCCESS, REQUEST_PENDING } from '../ActionTypes/asynchronous_actions'
const initialState = {
  logged_in : false,
  isFetching : false,
  fetchErrorMessage : "",
  activeUser : null,
  allUsers : []
}
function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        logged_in : true,
        activeUser : action.user
      }
    case LOGOUT_USER:
      return initialState;
    case SET_FULL_NAME:
      return {
        ...state,
        activeUser : {
          ...state.activeUser,
          fullName : action.fullName
        }
      };
    case REQUEST_PENDING:
      return {
        ...state,
        isFetching : true,
        fetchErrorMessage : ""
      }
    case ADD_INTEREST:
      return {
        ...state,
        activeUser : {
          ...state.activeUser,
          interests : [
            ...state.activeUser.interests,
             action.interest
           ]
        }
      }
    case REMOVE_INTEREST:
      let deleted = false
      let deleteFunc = (elem)=>{
        if(!deleted){
          deleted = elem === action.interest
          return elem!==action.interest
        }
        else {
          return true;
        }
      }
      return {
        ...state,
        activeUser : {
          ...state.activeUser,
          interests : state.activeUser.interests.filter(deleteFunc)
        }
      }
    case REQUEST_SUCCESS:
      return {
        ...state,
        isFetching : false,
        fetchErrorMessage : ""
      }
    case REQUEST_ERROR:
      return {
        ...state,
        isFetching : false,
        fetchErrorMessage : action.error_message
      }
    case SET_ALL_USERS:
      return {
        ...state,
        isFetching: false,
        allUsers: action.allUsers
      }
    default:
      return state
  }
}

export default user;
