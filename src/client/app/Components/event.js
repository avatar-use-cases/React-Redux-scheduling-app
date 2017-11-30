import React, { Component } from 'react'
import PropTypes from 'prop-types'
class EventComponent extends Component{

  generateListElements(list, label,labelId){
    return(
      <div>
        <label htmlFor={labelId}>{label}</label>
        <ul id={labelId}>
          {list.map((element, index)=><li key={labelId + index}>{element}</li>)}
        </ul>
      </div>
    )
  }
  render(){
    var event = this.props.event
    //Checks if the property exists before rendering
    return(
        <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.removeEvent(event);
                }}>
      <div className="well">
        {event.event && <h1>{event.event}</h1>}
        {event.startTime && <div>From: <span className="text-success">{new Date(event.startTime).toDateString()}</span></div>}
        {event.endTime && <div>To: <span className="text-danger">{new Date(event.endTime).toDateString()}</span></div>}
        {event.participants && this.generateListElements(event.participants, "Participants", "participants")}
        {event.organizers && this.generateListElements(event.organizers, "Organizers", "organizers") }
        {event.interests && this.generateListElements(event.interests, "Interests", "interests") }
        {event.description && <p>{event.description}</p>}
        {this.props.removeEvent && <button className="btn btn-danger" type="submit">Delete Event</button>}
      </div>
        </form>
      )
  }
}

EventComponent.propTypes = {
  event : PropTypes.object.isRequired
}

export default EventComponent;
