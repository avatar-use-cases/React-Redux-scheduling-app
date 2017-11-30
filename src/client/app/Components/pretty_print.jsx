import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PrettyPrint extends Component{
  render(){
        return <div><pre>{JSON.stringify(this.props.data, null, 2) }</pre></div>;
  }
}

PrettyPrint.propTypes = {
  data : PropTypes.object.isRequired
}

export default PrettyPrint
