import React, {PropTypes, Component} from 'react'
import { TextInput } from "react-native"
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

    this.state = {value}
    this.nextSelection = {
      start: value.length,
      end: value.length
    };
    this.prevValue = value;

    this.onSelectionChange = this.onSelectionChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onChangeText = this.onChangeText.bind(this)

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
      <TextInput
        {...props}
        ref={(ref) => this._inputRef = ref}
        defaultValue={this.state.value}
        onSelectionChange={this.onSelectionChange}
        onChange={this.onChange}
        onChangeText={this.onChangeText}
      />
    )
  }

  onSelectionChange(event) {
    // We do all the work here because we don't have the new cursor selection in the onChange event
    // This is different than how the web works where the new cursor position is sync
    const {nativeEvent: {selection}} = event

    if (typeof this.props.onSelectionChange === 'function') this.props.onSelectionChange(event)

    // When we set the new selection this callback is called but to the wrong selection
    // We want to skip it
    if (this.skipNext) return this.skipNext = false

    // If someone highlights we need to set it and update our new selection
    if (this.changeValue === undefined) {
      this.nextSelection = selection;
      this._inputRef._inputRef.setNativeProps({
        selection
      })
      return;
    };

    const {value, adjustedCaretPosition} = getNextMask({
      ...this.props,
      providedMask: this.props.mask,
      currentCaretPosition: selection.start,
      rawValue: this.changeValue,
      previousConformedValue: this.prevValue
    })

    this.nextSelection = {
      start: adjustedCaretPosition,
      end: adjustedCaretPosition,
    }

    this._inputRef._inputRef.setNativeProps({
      text: value,
      selection: this.nextSelection
    })

    this.skipNext = true;
    this.prevValue = value;
    this.changeValue = undefined;
  }

  onChangeText(text) {
    if (typeof this.props.onChangeText === 'function') {
      const {value} = getNextMask({
        ...this.props,
        providedMask: this.props.mask,
        currentCaretPosition: this.nextSelection.start,
        rawValue: text,
        previousConformedValue: this.prevValue
      })
      this.props.onChangeText(value)
    }
  }

  onChange(event) {
    // This will drive new value being set and selection set in onSelectionChange
    this.changeValue = event.nativeEvent.text

    const {value} = getNextMask({
      ...this.props,
      providedMask: this.props.mask,
      currentCaretPosition: this.nextSelection.start,
      rawValue: this.changeValue,
      previousConformedValue: this.prevValue
    })

    event.nativeEvent.text = value;
    
    console.log(value);
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }
  }
}

export default MaskedInput
