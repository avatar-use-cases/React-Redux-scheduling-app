import React, { Component } from 'react'
import PropTypes from 'prop-types'
class addInterests extends Component{

  onChange(e){
    var currentText = e.target.value
    this.props.onChange(currentText)
  }

  render(){
    let interest
      return(
      <div>
        <label htmlFor={this.props.username + "-interest-adder"}></label>
        <form onSubmit={(e)=>{
            e.preventDefault()
            if(!interest.value)
              return
            this.props.onSubmit()
            interest.value = ''
          }} id={this.props.username + "-interest-adder"}>
          <input maxLength="20" placeholder="interest" onChange={(e)=>{
              e.preventDefault()
              var currentText = e.target.value
              this.props.onChange(currentText)
            }} ref={(node)=>{interest = node}}/>
        </form>
      </div>)
    }
}

addInterests.propTypes = {
  username : PropTypes.string.isRequired,
  onSubmit : PropTypes.func.isRequired,//Callback function that handles a submission
  onChange : PropTypes.func.isRequired//Callback function that handles a change of the text input
}

export default addInterests
