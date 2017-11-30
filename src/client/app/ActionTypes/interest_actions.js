export const ADD_INTEREST = 'ADD_INTEREST'
export const TOGGLE_PENDING = 'TOGGLE_PENDING'
export const SET_INTERESTS = "SET_INTERESTS"
export const REMOVE_INTEREST = 'REMOVE_INTEREST'

export function togglePending(id){
  return { type: TOGGLE_PENDING, id }
}

export function addInterest(text, id){
  return { type : ADD_INTEREST, text, id }
}

export function setInterests(interests){
  return {type : SET_INTERESTS, interests}
}

export function removeInterest(id){
  return { type : REMOVE_INTEREST, id }
}
