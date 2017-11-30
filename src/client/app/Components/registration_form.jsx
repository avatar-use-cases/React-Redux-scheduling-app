import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserAutocomplete from './user_autocomplete'
import { setUserAsynch } from '../ActionTypes/user_level_actions'
import uuidv4 from 'uuid/v4'
class Register extends Component {
  constructor(props) {
    super(props)
    this.state={
      user:{
        userId: '',
        username :'',
        fullName : '',
        interests : []
      },
      this_interest : ''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addInterest = this.addInterest.bind(this);
  }
  onSubmit(event){
    event.preventDefault()
    this.props.onSubmit(this.state.user)
  }

  onChange(key, value){
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        [key]: value
      }
    })
  }

  addInterest(newInterest){
    this.setState({
      ...this.state,
      user:{
        ...this.state.user,
        interests:[
          ...this.state.user.interests,
          newInterest
        ]
      }
    })
  }

  removeInterest(interest){
    this.setState({
      ...this.state,
      user:{
        ...this.state.user,
        interests : this.state.user.interests.filter((elem)=>elem!==interest)
      }
    })
  }

  gatherInterestList(){
    return this.state.user.interests.map((interest, index)=>(<li key={index} onClick={(e)=>this.removeInterest(interest)}>{interest}</li>))
  }

  render() {
    let username // variable for referencing username <input> element
    let fullName // variable for referencing fullName <input> element
    let interest //
    return(
      <div>
      <h1>Registration</h1>
      <form onSubmit={this.onSubmit}>
        <label htmlFor="un">Username</label>
        <input placeholder="username" name="username" id="un" onChange={()=>this.onChange(username.name, username.value)} ref={(node)=>{username = node}}/>
        <label htmlFor="fn">Full Name</label>
        <input placeholder="full name" name="fullName" id="fn" onChange={()=>this.onChange(fullName.name, fullName.value)} ref={(node)=>{fullName = node}}/>
        <button type="submit" >Submit</button>
      </form>
      <form onSubmit={(e)=>{
          e.preventDefault()
          if(!interest.value){
            return
          }
          else{
            this.addInterest(interest.value)
            interest.value = ''
          }
        }}>
        <label htmlFor="int">Interests</label>
        <input type="text" placeholder="interest" name="this_interest" id="int" ref={(node)=>{interest = node}}/>
      </form>
      <label htmlFor="interests">Interests</label>
      <ul id="interests">
        {this.gatherInterestList()}
      </ul>
    </div>
      )
  }
}

Register.PropTypes = {
  onSubmit : PropTypes.func.isRequired
}

export default Register
