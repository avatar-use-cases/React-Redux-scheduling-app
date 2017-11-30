import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserAutocomplete from './user_autocomplete'
import { loginUser } from '../ActionTypes/user_level_actions'
import { fetchEvents } from '../ActionTypes/calendar_actions'

class Login extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(username){
    let findUserId = (user)=>user.username === username
    let thisUser = this.props.allUsers.find(findUserId)
    if(!thisUser)
      return
    thisUser.interests = [];
    this.props.login(thisUser)
  }
  render() {
    let username // variable for referencing username <input> element
    let fullName // variable for referencing fullName <input> element
    return(
      <div>
        <UserAutocomplete allUsers={this.props.allUsers} id="login-autocomplete" label="Login" onSubmit={this.onSubmit}/>
      </div>
      )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (id) => {
      dispatch(loginUser(id))
    },
    fetchEvents: () => {
      dispatch(fetchEvents())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    allUsers : state.user.allUsers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
