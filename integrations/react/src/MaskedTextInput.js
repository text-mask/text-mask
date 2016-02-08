import React, {PropTypes} from 'react'
import {getSelection, setSelection} from '../../../node_modules/react/lib/ReactInputSelection'
import {
  conformToPattern,
  convertPatternToPlaceholder,
  adjustCaretPosition
} from '../../../stringPattern/src/index'

export default React.createClass({
  propTypes: {
    pattern: PropTypes.string.isRequired
  },

  getInitialState() {
    const value = convertPatternToPlaceholder(this.props.pattern)

    return {
      placeholder: value,
      previousValue: value,
      value: null,
      currentCaretPosition: null
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({value: convertPatternToPlaceholder(nextProps.pattern)})
  },

  componentDidUpdate() {
    // Check that maskedTextInput has focus
    if (this.refs.maskedTextInput === document.activeElement) {
      // If setSelection is called while maskedTextInput doesn't have focus, it's gonna steal focus,
      // which is not what we want here.
      const caretPosition = adjustCaretPosition(
        this.state.previousValue,
        this.state.value,
        this.state.currentCaretPosition,
        this.props.pattern
      )

      setSelection(this.refs.maskedTextInput, {start: caretPosition, end: caretPosition})
    }
  },

  render() {
    const {props, state, onChange, onBlur} = this
    const placeholder = props.placeholder || state.placeholder
    const value = (state.value !== state.placeholder) ? state.value : null

    return (
      <input
        {...props}
        type="text"
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        ref="maskedTextInput"
      />
    )
  },

  onBlur(event) {
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event)
    }
  },

  onChange(event) {
    this.setState({
      value: conformToPattern(event.target.value, this.props.pattern),
      previousValue: this.state.value || this.state.previousValue,
      currentCaretPosition: getSelection(this.refs.maskedTextInput).start
    })

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }
  },
})
