import React, {PropTypes} from 'react'
import {
  conformToMask,
  convertMaskToPlaceholder,
  adjustCaretPosition,
  safeSetSelection
} from '../../../core/src/index.js'

export const MaskedInput = React.createClass({
  propTypes: {
    mask: PropTypes.string.isRequired
  },

  getInitialState({mask = this.props.mask} = {}) {
    return {
      conformedInput: '',
      adjustedCaretPosition: 0,
      placeholder: convertMaskToPlaceholder(mask)
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.mask !== this.props.mask) {
      this.setState(this.getInitialState({mask: nextProps.mask}))
    }
  },

  componentDidUpdate() {
    safeSetSelection(this.refs.inputElement, this.state.adjustedCaretPosition)
  },

  render() {
    const {props, state: {placeholder, conformedInput}, onChange} = this

    return (
      <input
        {...props}
        type={props.type || 'text'}
        onChange={onChange}
        value={conformedInput}
        placeholder={placeholder}
        ref="inputElement"
      />
    )
  },

  onChange(event) {
    const {target: {value: userInput}} = event
    const {props: {mask}, state: {placeholder, conformedInput: previousConformedInput}} = this
    const conformToMaskResults = conformToMask(userInput, mask)
    const {output: conformedInput} = conformToMaskResults

    const adjustedCaretPosition = adjustCaretPosition({
      previousInput: previousConformedInput,
      conformToMaskResults,
      currentCaretPosition: this.refs.inputElement.selectionStart
    })
    const finalConformedInput = (
      conformedInput === placeholder &&
      adjustedCaretPosition === 0
    ) ? '' : conformedInput

    this.setState({
      conformedInput: finalConformedInput,
      adjustedCaretPosition
    })

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
