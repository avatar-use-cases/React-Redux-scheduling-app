import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addInterest, removeInterest } from '../ActionTypes/user_level_actions'
import InterestPrompt from '../Components/add_interests'
import InterestDisplay from '../Components/interest_display'


class InterestsContainer extends Component{
  constructor(props) {
    super(props);
    this.state = { interest_text : '' };
    this.onChange = this.onChange.bind(this)
    this.onSubmission = this.onSubmission.bind(this)
    this.onInterestClick = this.onInterestClick.bind(this)
    // this.onInterestAction = this.onInterestAction.bind(this)
  }
  onSubmission(e){
    this.props.addInterest(this.state.interest_text)
    this.setState({interest_text : ''})
  }
  onChange(text){
    this.setState({interest_text : text})
  }
  onInterestClick(text){
    this.props.removeInterest(text)
  }
  render(){
    return (
      <div className="well">
        <InterestPrompt onChange={this.onChange} onSubmit={this.onSubmission} username={this.props.user.username}/>
        <InterestDisplay interests={this.props.interests} username={this.props.user.username} onInterestClick={this.onInterestClick} />
      </div>)
  }
}

const mapStateToProps = (state) => {
  return {
      interests : state.user.activeUser.interests,
      user : state.user.activeUser
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addInterest: (text) => {
      dispatch(addInterest(text))
    },
    removeInterest : (text) =>{
      dispatch(removeInterest(text))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(InterestsContainer)
