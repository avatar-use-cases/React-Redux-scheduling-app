import React, { Component, StyleSheet } from 'react'
import PropTypes from 'prop-types'

class InterestDisplay extends Component{
  gatherInterestList(){
    return this.props.interests.map((interest, index) => {
      return(
      <li key={index} onClick={()=>this.props.onInterestClick(interest)}>
      {interest}
      </li>)
    });
  }

  render(){
    if(this.props.interests != undefined){
        return(
        <div>
          <label htmlFor={this.props.username + "-interests"}>Interests</label>
          <ul id={this.props.username + "-interests"}>
            {this.gatherInterestList()}
          </ul>
        </div>
      )
    }
    else{
      return(
        <div className="text-center">
          <h2>No interests yet submitted</h2>
        </div>
      )
    }
  }
}

InterestDisplay.propTypes = {
  username : PropTypes.string.isRequired,
  onInterestClick : PropTypes.func.isRequired
}

export default InterestDisplay
