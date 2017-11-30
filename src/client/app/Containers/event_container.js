import React, { Component } from 'react'
import Calendar from '../Components/calendar'
import { deleteEventAsynch, fetchEvents } from '../ActionTypes/calendar_actions'
import { connect } from 'react-redux'
import EventPrompt  from '../Components/add_event'
class CalendarContainer extends Component {
    render() {
        if (this.props.isEvent) {
            return (
                <div className="well">
                    <Calendar events={this.props.events} removeEvent={this.props.removeEvent} label="Events"/>
                    <EventPrompt allUsers = {this.props.allUsers} />
                </div>
            )
        }
        else {
            return (
                <EventPrompt allUsers = {this.props.allUsers} />
            )
        }
    }
}

const mapStateToProps = (state) => {
  return {
      events : state.calendar.activeCalendar,
      isEvent : state.calendar.isEvent,
      allUsers : state.user.allUsers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  /*  fetchEvents : ()=>{
     dispatch(fetchEvents())
   },*/
      removeEvent : (event)=>{
          dispatch(deleteEventAsynch(event))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer)
