import React, {PropTypes} from 'react'
import {
  conformToMask,
  convertMaskToPlaceholder,
  adjustCaretPosition
} from '../../../core/src/index.js'

export const MaskedInput = React.createClass({
  propTypes: {
    mask: PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      previousValue: '',
      conformToMaskResults: {},
      currentCaretPosition: null
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.mask !== this.props.mask) {
      this.setState(this.getInitialState())
    }
  },

  componentDidUpdate() {

    // Check that inputElement has focus
    if (this.refs.inputElement === document.activeElement) {

      // If setSelection is called while inputElement doesn't have focus, it's gonna steal focus,
      // which is not what we want here.
      const caretPosition = adjustCaretPosition({
        previousInput: this.state.previousValue,
        conformToMaskResults: this.state.conformToMaskResults,
        currentCaretPosition: this.state.currentCaretPosition
      })

      this.refs.inputElement.setSelectionRange(caretPosition, caretPosition, 'none')
    }
  },

  render() {
    const {props, state, onChange} = this
    const placeholder = props.placeholder || convertMaskToPlaceholder(this.props.mask)
    const value = (state.conformToMaskResults.output !== placeholder) ?
      state.conformToMaskResults.output :
      ''

    return (
      <input
        {...props}
        type={props.type || 'text'}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        ref="inputElement"
      />
    )
  },

  onChange(event) {
    const state = {
      conformToMaskResults: conformToMask(event.target.value, this.props.mask),
      previousValue: this.state.conformToMaskResults.output || this.state.previousValue,
      currentCaretPosition: this.refs.inputElement.selectionStart
    }

    this.setState(state)

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }
  },
})

export default MaskedInput

export {
  conformToMask,
  convertMaskToPlaceholder,
  adjustCaretPosition
} from '../../../core/src/index.js'
