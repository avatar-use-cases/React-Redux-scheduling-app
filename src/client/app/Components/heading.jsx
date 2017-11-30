import React, { Component } from 'react'
import { connect } from 'react-redux'

class Header extends Component{
  render(){
    if(this.props.logged_in){
      return(
        <div className="well row text-center">
          <div className="col-md-6">
            <h3>User: <span className="text-primary">{this.props.username}</span></h3>
          </div>
          <div className="col-md-6">
            <h3>Name: <span className="text-success">{this.props.fullName}</span></h3>
          </div>
        </div>

      )
    }
    else {
      return null
    }
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.user.activeUser.username,
    fullName : state.user.activeUser.fullName,
    logged_in : state.user.logged_in
  }
}

export default connect(mapStateToProps)(Header)
