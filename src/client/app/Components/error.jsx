import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'



class ErrorAlert extends Component {

    render() {

          return (
              <div class="alert alert-warning alert-dismissible fade show" role="alert">
                {this.props.error_message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
          )
    }
}


ErrorAlert.propTypes = {
    error_message: PropTypes.string.isRequired
}


export default ErrorAlert
