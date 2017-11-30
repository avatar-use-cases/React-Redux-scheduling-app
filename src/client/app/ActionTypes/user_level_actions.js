import { getUsers, getUser, createUser } from '../Utility/route_utility'
import {parseUserJSON} from '../Utility/helper_funcs'
import { requestError, requestSuccess, requestPending } from './asynchronous_actions'
import {parseString} from 'xml2js'

/*
 * action types
 */

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const SET_FULL_NAME = 'SET_FULL_NAME'
export const ADD_INTEREST = 'ADD_INTEREST'
export const REMOVE_INTEREST = 'REMOVE_INTEREST'
export const SET_ALL_USERS = 'SET_ALL_USERS'

/*
 * action creators
 */

export function loginUser(user) {
  return { type: LOGIN_USER, user}
}

export function logoutUser() {
  return { type: LOGOUT_USER }
}

export function setFullName(full_name){
  return {type : SET_FULL_NAME, full_name }
}


export function addInterest(interest){
  return { type : ADD_INTEREST, interest }
}

export function removeInterest(interest){
  return { type : REMOVE_INTEREST, interest}
}

export function setAllUsers(allUsers) {
  return {type : SET_ALL_USERS, allUsers}
}


export function setUserAsynch(person){
  return function(dispatch){
    dispatch(requestPending())
    let success = (userJSON)=>{
      parseUserJSON(userJSON)
      dispatch(requestSuccess())
    }
    let error = (error)=>{
      window.alert(error.message)
      dispatch(requestError(error.message))
    }
    getUser(success,error, person);
  }
}

export function getUsersAsynch(){
  return function(dispatch){
    let allUsers = []
    dispatch(requestPending())
    let success = (users)=>{
      console.log(users)
      parseString(users, (err, result) => {
          console.log(result.sparql.results[0].result);
          allUsers = parseUserJSON(result.sparql.results[0].result);
      })
      console.log(allUsers)
      dispatch(setAllUsers(allUsers))
      dispatch(requestSuccess())
    }
    let error = (error)=>{
      window.alert(error.message)
      dispatch(requestError(error.message))
    }
    getUsers(success,error);
  }
}

export function registerUserAsynch(person){
  return function(dispatch){
    dispatch(requestPending())
    let success = (user)=>{
      dispatch(requestSuccess())
      dispatch(loginUser(person))
  }
    let error = (error)=>{
      window.alert(error.message)
      dispatch(requestError(error.message))
    }
    createUser(success,error, person);
  }
}
