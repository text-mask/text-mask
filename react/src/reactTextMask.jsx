import React, {PropTypes} from 'react'
import {
  conformToMask,
  convertMaskToPlaceholder,
  adjustCaretPosition,
  safeSetSelection
} from '../../core/src/index.js'

const getConformedMaskResults = (userInput, mask, guide, previousConformedInput) => {
  return conformToMask(userInput, mask, (guide === false) ? {guide, previousConformedInput} : {})
}

export const MaskedInput = React.createClass({
  propTypes: {
    mask: PropTypes.string.isRequired,
    guide: PropTypes.bool
  },

  getInitialState({ mask = this.props.mask, guide = this.props.guide } = {}) {
    const { output: conformedInput } = getConformedMaskResults(this.props.value, mask, guide, '')
    const placeholder = convertMaskToPlaceholder(mask)
    const finalConformedInput = (
      conformedInput === placeholder
    ) ? '' : conformedInput

    return {
      conformedInput: finalConformedInput,
      adjustedCaretPosition: 0,
      placeholder
    }
  },

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.mask !== this.props.mask ||
      nextProps.guide !== this.props.guide
    ) {
      this.setState(this.getInitialState({mask: nextProps.mask, guide: nextProps.guide}))
    }
  },

  componentDidUpdate() {
    safeSetSelection(this.refs.inputElement, this.state.adjustedCaretPosition)
  },

  render() {
    const {props, state: {placeholder: componentPlaceholder, conformedInput}, onChange} = this
    const {placeholder = componentPlaceholder, type = 'text'} = props

    return (
      <input
        {...props}
        type={type}
        onChange={onChange}
        value={conformedInput}
        placeholder={placeholder}
        ref='inputElement'
      />
    )
  },

  onChange(event) {
    const {target: {value: userInput}} = event
    const {
      props: {mask, guide},
      state: {placeholder, conformedInput: previousConformedInput}
    } = this

    const conformToMaskResults = getConformedMaskResults(
      userInput,
      mask,
      guide,
      previousConformedInput
    )
    const {output: conformedInput} = conformToMaskResults

    const adjustedCaretPosition = adjustCaretPosition({
      previousConformedInput,
      conformToMaskResults,
      currentCaretPosition: this.refs.inputElement.selectionStart
    })

    const finalConformedInput = (
      conformedInput === placeholder &&
      adjustedCaretPosition === 0
    ) ? '' : conformedInput

    this.setState({conformedInput: finalConformedInput, adjustedCaretPosition})

    event.target.value = finalConformedInput

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
} from '../../core/src/index.js'
