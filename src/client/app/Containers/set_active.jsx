import Login from '../Components/login'
import Register from '../Components/registration_form'

import { registerUserAsynch } from '../ActionTypes/user_level_actions'

import React, { Component } from 'react'
import { connect } from 'react-redux'

class SetActive extends Component{

  render(){
      return(
      <div className="text-center">
        <Login />
        <hr/>
        <Register onSubmit={(user)=>this.props.register(user)}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register : (data)=>{
      dispatch(registerUserAsynch(data))
    }
  }
}
export default connect(null,mapDispatchToProps)(SetActive)
