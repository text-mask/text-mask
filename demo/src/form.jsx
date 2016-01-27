import React, {Component, PropTypes} from 'react';
import {getSelection, setSelection} from 'react/lib/ReactInputSelection'
import adjustCursorPosition from '../../src/adjustCursorPosition.js'

const Form = React.createClass({
  propTypes: {
    value: PropTypes.string.isRequired,
    updateValue: PropTypes.func.isRequired,
    cursorPosition: PropTypes.object,
    setCursorPosition: PropTypes.func.isRequired
  },

  componentWillMount() {
    this.previousValue = this.props.value
  },

  render() {
    return <input type="text" onChange={this.onChange} value={this.props.value} ref="hello" />
  },

  onChange(event) {
    this.props.setCursorPosition(getSelection(this.refs.hello))
    this.props.updateValue(event.target.value)
  },

  componentDidUpdate() {
    console.log(this.previousValue);
    console.log(this.props.value);
    console.log(this.props.cursorPosition);

    const cursorPosition = adjustCursorPosition(
      this.previousValue,
      this.props.value,
      this.props.cursorPosition.start,
      '(111) 111-1111'
    )

    setSelection(this.refs.hello, {start: cursorPosition, end: cursorPosition})

    this.previousValue = this.props.value
  }
})

export default Form
