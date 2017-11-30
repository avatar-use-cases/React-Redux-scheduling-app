import React, { Component, StyleSheet} from 'react'
import PropTypes from 'prop-types'
import { postEvent } from '../ActionTypes/calendar_actions'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import update from 'immutability-helper'
import UserAutocomplete from './user_autocomplete'
import PrettyPrint from './pretty_print'
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'
import uuidv4 from 'uuid/v4'

const initialEventState = {
  event: '',
  eventId: uuidv4(),
  description: '',
  startTime: moment().format(),
  endTime: moment().format(),
  participants: [],
  organizers: [],
  interests: []
}
class EventPrompt extends Component{
  constructor(props) {
    super(props);
    this.state = {
      event: initialEventState
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmission = this.onSubmission.bind(this);
    this.onChangeArray = this.onChangeArray.bind(this);
    this.autoCompleteParticipantSubmit = this.autoCompleteParticipantSubmit.bind(this);
    this.autoCompleteOrganizerSubmit = this.autoCompleteOrganizerSubmit.bind(this);
  }
  autoCompleteParticipantSubmit(value) {
    this.onChangeArray("participants", value);
  }
  autoCompleteOrganizerSubmit(value) {
  this.onChangeArray("organizers", value);
}
  onChange(name, value) {
    this.setState({
      ...this.state,
      [name]: value
    })
  }
  onChangeArray(name, value) {
    this.setState(function (previousState, currentProps) {
      var newState = previousState.event[name].indexOf(value) < 0 ? update(previousState, {
        event: {
          [name]: {
            $push: [value]
          }
        }
      }) : previousState;
      console.log(newState);
      return newState;
    });
  }
  onSubmission() {
    //These props are required for each event object
    if( !!this.state.event.event && !!this.state.event.startTime && !!this.state.event.endTime ){
      console.log(this.state.event)
      this.props.addEvent(this.state.event);
      this.setState({event:initialEventState})
    }
  }
  render(){
    /*Will replace with Date Pickers*/
    return(
        <div>
          <form onSubmit={(e) => {
                    e.preventDefault();
                    this.onSubmission();
                }}>
            <input name="event" placeholder ="Event Name" onChange={(e)=>{
                        this.onChange(e.target.name, e.target.value);
                    }}/>
            <input name="description" placeholder="Event Description" onChange={(e)=>{
                        this.onChange(e.target.name, e.target.value);
                    }} />
            <DatePicker placeholderText="Start Time" selectsStart selected = {moment(this.state.event.startTime)}
                        startDate={moment(this.state.event.startTime)}
                        endDate={moment(this.state.event.endTime)}
                        onChange={(e)=> {
                        this.onChange("startTime", e.toISOString());
                    }}/>
            <DatePicker placeholderText="End Time" selectsEnd selected = {moment(this.state.event.endTime)}
                        startDate={moment(this.state.event.startTime)}
                        endDate={moment(this.state.event.endTime)}
                        onChange={(e)=> {
                        this.onChange("endTime", e.toISOString());
                    }}/>
            <input name="interests" placeholder="Interests" onChange={(e)=>{
                        var array = e.target.value.split(',');
                        this.onChange(e.target.name, array);
                    }}/>
            <input name="participants" placeholder="Participants" onChange={(e)=>{
                      var array = e.target.value.split(',');
                      this.onChange(e.target.name, array)
            }} />
            <input name="organizers" placeholder="Organizers" onChange={(e)=>{
                      var array = e.target.value.split(',');
                      this.onChange(e.target.name, array)
            }} />
            <button className="btn btn-success" type="submit">Add Event</button>
          </form>
          <PrettyPrint data={this.state.event}/>
        </div>)
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    addEvent : (newEvent)=> {
      dispatch(postEvent(newEvent))
    }
  }
};


export default connect(null, mapDispatchToProps) (EventPrompt)
