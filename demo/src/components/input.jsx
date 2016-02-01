import React, {PropTypes} from 'react'
import {getSelection, setSelection} from 'react/lib/ReactInputSelection'
import {
  conformToPattern,
  convertPatternToPlaceholder,
  adjustCaretPosition
} from '../../../src/index'

let currentCaretPosition = null
let previousValue = null

export default React.createClass({
  propTypes: {
    pattern: PropTypes.string.isRequired
  },

  getInitialState() {
    const initialState = {value: convertPatternToPlaceholder(this.props.pattern)}

    previousValue = initialState.value

    return initialState
  },

  componentWillReceiveProps(nextProps) {
    this.setState({value: convertPatternToPlaceholder(nextProps.pattern)})
  },

  componentDidUpdate() {
    // Check that maskedInput has focus
    if (this.refs.maskedInput === document.activeElement) {
      // If setSelection is called while maskedInput doesn't have focus, it's gonna steal focus,
      // which is not what we want here.
      const caretPosition = adjustCaretPosition(
        previousValue,
        this.state.value,
        currentCaretPosition,
        this.props.pattern
      )

      setSelection(this.refs.maskedInput, {start: caretPosition, end: caretPosition})
    }
  },

  render() {
    return (
      <input
        type="text"
        onChange={this.onChange}
        value={this.state.value}
        ref="maskedInput"
        {...this.props}
      />
    )
  },

  onChange(event) {
    currentCaretPosition = getSelection(this.refs.maskedInput).start

    previousValue = this.state.value

    this.setState({value: conformToPattern(event.target.value, this.props.pattern)})
  }
})
