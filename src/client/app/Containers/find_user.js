import React, { Component } from 'react'
import Calendar from '../Components/calendar'
import { connect } from 'react-redux'
import UserAutocomplete from '../Components/user_autocomplete'

class findParticipant extends Component {
    constructor(props){
      super(props)
      this.onSubmit = this.onSubmit.bind(this)
      this.selectChange = this.selectChange.bind(this)
      this.state = {
        events : [],
        select:'participants',
        username : ''
      }
    }
    onSubmit(username){
        let select = this.state.select
        this.setState({
          events : this.props.events.filter((ev)=>{
            return ev[select].indexOf(username) > -1
          }),
          select : select,
          username : username
        })
    }
    selectChange(event){
      let username = this.state.username
      let new_select = event.target.value
      this.setState({
        events : this.props.events.filter((ev)=>{
          return ev[new_select].indexOf(username) > -1
        }),
        select : new_select,
        username : username
      })
    }
    render() {
        let user
        return(
          <div>
            <select value={this.state.select} onChange={this.selectChange}>
              <option value="participants">Participant</option>
              <option value="organizers">Organizer</option>
            </select>
            <UserAutocomplete allUsers={this.props.allUsers} id="participants-autocomplete" label={this.state.select == "participants" ? "Participants" : "Organizers"} onSubmit={this.onSubmit} />
            <Calendar events={this.state.events} label={this.state.select == "participants" ? "Participant Events" : "Organizer Events"}></Calendar>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      events : state.calendar.activeCalendar,
      allUsers : state.user.allUsers
  }
}

export default connect(mapStateToProps)(findParticipant)
