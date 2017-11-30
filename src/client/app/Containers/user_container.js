import Header from '../Components/heading'
import Interest from './interests_container'
import SetActive from './set_active'
import CalendarContainer from './event_container'
import FindUser from './find_user'
import React, { Component } from 'react'
import { fetchEvents } from '../ActionTypes/calendar_actions'
import { connect } from 'react-redux'

class UserContainer extends Component{
  render(){
    if(!this.props.logged_in)
    {
      return(
      <div className="text-center">
        <SetActive/>
      </div>
    )
  }
    else{
      this.props.fetchEvents()
      return(
      <div>
        <Header />
        <div className="row">
          <div className="col-md-6">
            <Interest />
          </div>
          <div className="col-md-6">
            <CalendarContainer/>
          </div>
        </div>
      </div>
    )
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => {
      dispatch(fetchEvents())
    }
  }
}
const mapStateToProps = (state) => {
  return {
      logged_in : state.user.logged_in,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
