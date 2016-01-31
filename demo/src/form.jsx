import React, {Component, PropTypes} from 'react';
import {getSelection, setSelection} from 'react/lib/ReactInputSelection'
import adjustCaretPosition from '../../src/adjustCaretPosition.js'

const Form = React.createClass({
  propTypes: {
    value: PropTypes.string.isRequired,
    updateValue: PropTypes.func.isRequired,
    caretPosition: PropTypes.object,
    setCaretPosition: PropTypes.func.isRequired
  },

  componentWillMount() {
    this.previousValue = this.props.value
  },

  render() {
    return <input type="text" onChange={this.onChange} value={this.props.value} ref="hello" />
  },

  onChange(event) {
    this.props.setCaretPosition(getSelection(this.refs.hello))
    this.props.updateValue(event.target.value)
  },

  componentDidUpdate() {
    console.log(this.previousValue);
    console.log(this.props.value);
    console.log(this.props.caretPosition);

    const caretPosition = adjustCaretPosition(
      this.previousValue,
      this.props.value,
      this.props.caretPosition.start,
      '(111) 111-1111'
    )

    setSelection(this.refs.hello, {start: caretPosition, end: caretPosition})

    this.previousValue = this.props.value
  }
})

export default Form
