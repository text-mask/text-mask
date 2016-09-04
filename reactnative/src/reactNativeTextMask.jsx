import React, {PropTypes, Component} from 'react'
import {getNextMask} from '../../core/src/createTextMaskInputElement.js'

class MaskedInput extends Component {

  constructor(props, context) {
    super(props, context)

    const {value} = getNextMask({
      ...props,
      currentCaretPosition: props.value.length,
      providedMask: props.mask,
      rawValue: props.value,
      previousConformedValue: ''
    })

    this.state = {
      value,
      selection: {
        start: value.length,
        end: value.length
      }
    }

    this.onSelectionChange = this.onSelectionChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const {value, adjustedCaretPosition} = getNextMask({
      ...nextProps,
      providedMask: nextProps.mask,
      currentCaretPosition: this.state.selection.start,
      rawValue: nextProps.value,
      previousConformedValue: this.state.value
    })

    let selection = {
      start: adjustedCaretPosition,
      end: adjustedCaretPosition
    }

    //We will need to check if there is stuff selected before we set the new selection so we don't destroy selections
    //But also making sure they actually typed a value in
    //If they did then we'll collapse the selection'
    if (this.state.selection.start !== this.state.selection.end && nextProps.value !== this.state.value) {
      selection = this.state.selection
    }

    this.setState({
      value,
      selection,
    })
  }

  render() {
    const props = {...this.props}

    delete props.mask
    delete props.guide
    delete props.pipe
    delete props.placeholderChar
    delete props.onAccept
    delete props.onReject
    delete props.keepCharPositions
    delete props.value

    return (
      <input
        {...props}
        selection={this.state.selection}
        onSelectionChange={this.onSelectionChange}
        onChange={this.onChange}
        onChangeText={this.onChangeText}
        value={this.state.value}
      />
    )
  }

  onSelectionChange(event) {
    const {nativeEvent: {selection}} = event
    this.setState({selection})
    if (typeof this.props.onSelectionChange === 'function') {
      this.props.onSelectionChange(event)
    }
  }

  onChangeText(text) {
    if (typeof this.props.onChangeText === 'function') {
      const {value} = getNextMask({
        ...this.props,
        providedMask: this.props.mask,
        currentCaretPosition: this.state.selection.start,
        rawValue: text,
        previousConformedValue: this.state.value
      })
      this.props.onChangeText(value)
    }
  }

  onChange(event) {
    const {value} = getNextMask({
      ...this.props,
      providedMask: this.props.mask,
      currentCaretPosition: this.state.selection.start,
      rawValue: event.target.value,
      previousConformedValue: this.state.value
    })
    event.target.value = value
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }
  }
}

MaskedInput.propTypes = {
  mask: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.shape({
      mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
      pipe: PropTypes.func
    })
  ]).isRequired,
  guide: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pipe: PropTypes.func,
  placeholderChar: PropTypes.string,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  keepCharPositions: PropTypes.bool
}

export default MaskedInput
