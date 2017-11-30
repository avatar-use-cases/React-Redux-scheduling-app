import {createEvent, getEvent, deleteEvent, getEvents, updateEvent} from '../Utility/route_utility'
import { turnIdsToUsernames, turnUsernamesToIds} from '../Utility/helper_funcs'
import { requestError, requestSuccess, requestPending } from './asynchronous_actions'
import {parseString} from 'xml2js'
import {parseEventJSON} from '../Utility/helper_funcs'

/*
 * action types
 */

export const REMOVE_EVENT = 'REMOVE_EVENT'
export const ADD_EVENT = 'ADD_EVENT'

export const ADD_EVENTS = 'ADD_EVENTS'
export const CLEAR_EVENTS = 'CLEAR_EVENTS'
/*
 * action creators
 */

export function removeEvent(event){
  return { type: REMOVE_EVENT, event }
}

export function addEvent(event){
  return { type: ADD_EVENT, event }
}

function clearEvents(){
  return {
    type : CLEAR_EVENTS,
   }
}

function addEvents(events) {
    return {
        type: ADD_EVENTS,
        events
    }
}

 export function fetchEvents() {
   return function(dispatch, getState) {
     dispatch(clearEvents())
     dispatch(requestPending())
     let success = (events)=> {
       if (!events) {
          dispatch(requestSuccess())
          return
        }
        let allEvents = []
       parseString(events, (err, result) => {
         console.log(result.sparql.results[0].result)
           allEvents = parseEventJSON(result.sparql.results[0].result, getState().user.activeUser.username, getState().user.allUsers);
       })
        dispatch(addEvents(allEvents));
        dispatch(requestSuccess())
     }
    let error = (error)=>{
      window.alert(error.message)

        dispatch(requestError(error));
    }
    console.log(getState().user.activeUser.user);
    getEvents(success, error, getState().user.activeUser.user);
    }
}
/*export function fetchEvent(event) {
    return function(dispatch) {
        dispatch(requestPending())
        let success = ()=> {
            dispatch(requestSuccess());
            dispatch(addEvent(event))
        }
        let error = (error)=>{
            dispatch(requestError(error));
        }
        getEvents(success, error, event);
    }
}
*/

export function postEvent(e) {
    return function(dispatch, getState) {
        let success = (res)=>{
            // let eventToAdd = e;
            // eventToAdd.eventId = res.eventId;
            // dispatch(addEvent(eventToAdd));
            dispatch(addEvent(e))
        }
        let error = (error)=>{
          window.alert(error.message)

            dispatch(requestError(error));
        }
        createEvent(success, error, e, getState().user.allUsers);
    }
}

export function deleteEventAsynch(event) {
    return function (dispatch, getState) {
        let success = (result) => {
            // dispatch(removeEvent(eventId));
                        // console.log("User Id:", getState().user.activeUser.userId);
            dispatch(removeEvent(event))
            dispatch(requestSuccess())
        }
        let error = (error)=>{
          window.alert(error.message)
            dispatch(requestError(error));
        }
        deleteEvent(success, error, event, getState().user.allUsers);
    }
}
