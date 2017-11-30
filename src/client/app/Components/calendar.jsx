import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Event from './event'
class Calendar extends Component{
  constructor(props){
    super(props)
    this.getEvents = this.getEvents.bind(this)
  }
  getEvents (){
    console.log(this.props.events)
    return this.props.events.map((event)=><Event event={event} removeEvent={this.props.removeEvent} key={event.eventId}/>);
  }
  render(){
    return(
      <div>
        <h2>{this.props.label}</h2>
        {this.getEvents()}
      </div>
      )
  }
}

Calendar.PropTypes = {
  events : PropTypes.arrayOf(PropTypes.object).isRequired,
  label  : PropTypes.string.isRequired
}

export default Calendar
