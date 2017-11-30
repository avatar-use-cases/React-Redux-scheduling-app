import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Autocomplete from 'react-autocomplete'

let styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  }
}

class UserAutocomplete extends Component{
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      suggestions : this.props.allUsers
    }
    this.onSelect = this.onSelect.bind(this)
    this.onChange = this.onChange.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(event, value){
    let theseSuggestions = this.props.allUsers
    this.setState({ value : value, suggestions : theseSuggestions.filter((elem)=>{
        return !!elem.username.toLowerCase().includes(value.toLowerCase())
      })
    })
  }
  renderItem(item, isHighlighted){
    return (
      <div
        style={isHighlighted ? styles.highlightedItem : styles.item}
        key={item.userId}
        id={item.userId}
      >{item.username}</div>
    )
  }
  onSelect(value, item){
    this.setState({ value, suggestions: [ item ] })
  }
  onSubmit(event){
    event.preventDefault()
    this.props.onSubmit(this.state.value)
    this.setState({value : '', suggestions : this.props.allUsers})
  }
  render(){
    return(
      <form onSubmit={this.onSubmit}>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <Autocomplete
            inputProps={{ name: 'Users', id: this.props.id }}
            ref="autocomplete"
            value={this.state.value}
            items={this.state.suggestions}
            getItemValue={(item) => item.username}
            onSelect={this.onSelect}
            onChange={this.onChange}
            renderItem={this.renderItem}
            />
      </form>
    )
  }
}

UserAutocomplete.PropTypes = {
  allUsers : PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit : PropTypes.func.isRequired,
  id : PropTypes.string.isRequired,
  label : PropTypes.string.isRequired
}

export default UserAutocomplete
