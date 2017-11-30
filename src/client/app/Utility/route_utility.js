import axios from 'axios'
import uuidv4 from 'uuid/v4'
import {API_HOST_QUERY as QUERY_URL, API_HOST_UPDATE as UPDATE_URL} from '../../../../.env'
import {getRegisterUserQuery, getAddEventQuery, getAllUsers, getSelectEvent, getDeleteEvent} from '../Utility/queries.js'

var queryConfig = {
   headers: {'Content-Type': 'application/sparql-query',
    'Accept': 'application/json'
 }
}

var updateConfig = {
   headers: {'Content-Type': 'application/sparql-update',
              'Accept': 'application/json'}
}
//Event Routes
export const createEvent = (success, err, e, allUsers)=>{
    let query = getAddEventQuery(allUsers, e);
    axios.post(`${UPDATE_URL}`, query, updateConfig).then((res)=>success(res.data)).catch(err)
}

export const getEvents = (success, err, user)=>{
  let query = getSelectEvent(user)
 axios.post(`${QUERY_URL}`, query, queryConfig).then((res)=>success(res.data)).catch(err)
}


export const deleteEvent = (success, err, id, allUsers)=>{
  let deleteQuery = getDeleteEvent(id, allUsers)
    axios.post(`${UPDATE_URL}`, deleteQuery, updateConfig).then((res)=>success(res.data)).catch(err)
}

//Users Route
export const createUser = (success, err, user)=>{
  user.userId = uuidv4();
  let data = getRegisterUserQuery(user.userId, user.username, user.fullName, user.interests )
  console.log(data)
    axios.post(`${UPDATE_URL}`,data, updateConfig).then((res)=>success(res.data)).catch(err)
}

export const updateUser = (success, err, data, id)=>{
    axios.post(`${UPDATE_URL}`, data).then((res)=>success(res.data)).catch(err)
}

export const getUsers = (success, err)=>{
  let query = getAllUsers();
    axios.post(`${QUERY_URL}`, query, queryConfig).then((res)=>success(res.data)).catch(err)
}

export const getUser = (success, err, id)=>{
    axios.post(`${QUERY_URL}`).then((res)=>success(res.data)).catch(err)
}

export const deleteUser = (success, err, id)=>{
    axios.post(`${UPDATE_URL}`, updateConfig).then((res)=>success(res.data)).catch(err)
}
