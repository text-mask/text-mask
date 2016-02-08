import React, {PropTypes} from 'react'
import {getSelection, setSelection} from 'react/lib/ReactInputSelection'
import {
  conformToMask,
  convertMaskToPlaceholder,
  adjustCaretPosition
} from '../../../core/src/index.js'

export default React.createClass({
  propTypes: {
    mask: PropTypes.string.isRequired
  },

  getInitialState() {
    const value = convertMaskToPlaceholder(this.props.mask)

    return {
      placeholder: value,
      previousValue: value,
      value: null,
      currentCaretPosition: null
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      placeholder: convertMaskToPlaceholder(nextProps.mask),
      value: null
    })
  },

  componentDidUpdate() {
    // Check that inputElement has focus
    if (this.refs.inputElement === document.activeElement) {
      // If setSelection is called while inputElement doesn't have focus, it's gonna steal focus,
      // which is not what we want here.
      const caretPosition = adjustCaretPosition(
        this.state.previousValue,
        this.state.value,
        this.state.currentCaretPosition,
        this.props.mask
      )

      setSelection(this.refs.inputElement, {start: caretPosition, end: caretPosition})
    }
  },

  render() {
    const {props, state, onChange} = this
    const placeholder = props.placeholder || state.placeholder
    const value = (state.value !== state.placeholder) ? state.value : null

    return (
      <input
        {...props}
        type="text"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        ref="inputElement"
      />
    )
  },

  onChange(event) {
    this.setState({
      value: conformToMask(event.target.value, this.props.mask),
      previousValue: this.state.value || this.state.previousValue,
      currentCaretPosition: getSelection(this.refs.inputElement).start
    })

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }
  },
})
