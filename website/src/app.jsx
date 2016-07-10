import './styles.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import MaskedInput from '../../react/src/reactTextMask.jsx' // eslint-disable-line
import classnames from 'classnames'
import appStyles from './app.scss'
import {initialState, DemoTop, DemoBottom} from './demoHelpers.jsx' // eslint-disable-line

export default React.createClass({ // eslint-disable-line
  getInitialState() {
    return Object.assign({}, initialState)
  },

  render() {
    const {
      guide,
      choices,
      placeholderChar,
      selectedChoice,
      customMask,
      rejectMessage,
    } = this.state
    const {
      mask: choiceMask,
      placeholder,
      help,
      validator,
      value,
      onRejectMessage,
      onAcceptMessage,
      style
    } = choices[selectedChoice]
    const maskedInputKey = JSON.stringify({
      customMask,
      selectedChoice,
      placeholderChar,
      guide
    })
    const maskInUse = choiceMask || customMask
    const isDynamicMask = typeof maskInUse === 'function'
    const placeholderValue = (guide !== true || isDynamicMask) ? placeholder : undefined

    return (
      <div className={classnames(appStyles.mainContainer, 'container')}>
        <DemoTop/>

        <div>
          <form className='form-horizontal'>
            <div className='form-group'>
              <label
                className='col-sm-3 control-label'
                htmlFor='maskedInput'>Masked input</label>

              <div className='col-sm-9'>
                <MaskedInput
                  style={style}
                  key={maskedInputKey}
                  placeholder={placeholderValue}
                  placeholderChar={placeholderChar}
                  validator={validator}
                  ref='maskedInput'
                  mask={maskInUse}
                  guide={guide}
                  onReject={() => this.onReject(onRejectMessage)}
                  onAccept={() => this.onAccept(onAcceptMessage)}
                  className='form-control'
                  id='maskedInput'
                />
              </div>
            </div>

            {rejectMessage && (
              <div className='form-group row'>
                <div className='col-sm-9 col-sm-offset-3'>
                  <p className='alert alert-warning' style={{margin: 0}}>
                    {rejectMessage}
                  </p>
                </div>
              </div>
            )}

            <div className='form-group row'>
              <label
                htmlFor='mask'
                className='col-sm-3 col-xs-12 control-label'>Mask</label>

              <div className='col-sm-4 col-xs-12'>
                <select
                  className='form-control'
                  value={value}
                  onChange={this.onDropDownListChoiceSelect}
                  ref='maskSelect'>
                  {choices.map((choice, index) => {
                    return <option key={index} value={choice.value}>{choice.name}</option>
                  })}
                </select>
              </div>

              <div className='col-sm-5 col-xs-12'>
                <input
                  style={{display: (isDynamicMask) ? null : 'none'}}
                  disabled
                  type='text'
                  value='Dynamic mask'
                  className={classnames('form-control', appStyles.mask)}
                />
                <input
                  style={{display: (isDynamicMask) ? 'none' : null}}
                  ref='mask'
                  type='text'
                  onChange={this.onManualMaskChange}
                  value={maskInUse}
                  className={classnames('form-control', appStyles.mask)}
                  id='mask'
                />
              </div>
            </div>

            {help !== undefined && <div className='form-group row'>
              <div className='col-sm-9 col-sm-offset-3'>
                <p className='alert alert-info' style={{margin: 0}}>
                  {help}
                </p>
              </div>
            </div>}

            <div className='form-group'>
              <label htmlFor='guide' className='col-sm-3 control-label'>Guide</label>

              <div className='col-sm-2'>
                <select className='form-control' onChange={this.changeGuide} value={guide}>
                  <option value={false}>Off</option>
                  <option value={true}>On</option>
                </select>
              </div>
            </div>

            <div className='form-group'>
              <label htmlFor='placeholderChar' className='col-sm-3 control-label'>
                Placeholder character
              </label>

              <div className='col-sm-6'>
                {guide === true && (
                  <select
                    id='placeholderChar'
                    className='form-control'
                    onChange={this.changePlaceholderChar}
                  >
                    <option value={'\u2000'}>\u2000 (white space)</option>
                    <option value='_'>_ (underscore)</option>
                  </select>
                ) || (
                  <select
                    disabled
                    id='placeholderChar'
                    className='form-control'
                    onChange={this.changePlaceholderChar}
                  >
                    <option>Turn guide on to see placeholder character</option>
                  </select>
                )}
              </div>
            </div>
          </form>

          <DemoBottom/>
        </div>
      </div>
    )
  },

  onManualMaskChange({target: {value: customMask}}) {
    const selectedChoice = this.findChoice('mask', customMask)
    const customChoice = this.findChoice('value', 'custom')
    const finalSelectedChoice = (selectedChoice !== -1) ?
      selectedChoice :
      customChoice

    this.setState({
      customMask,
      selectedChoice: finalSelectedChoice,
      rejectMessage: null,
      acceptMessage: null
    })
  },

  onDropDownListChoiceSelect({target: {value: selectValue}}) {
    const {findChoice} = this
    const selectedChoice = findChoice('value', selectValue)

    this.setState({
      selectedChoice,
      customMask: '',
      rejectMessage: null,
      acceptMessage: null
    }, () => {
      if (selectValue === 'custom') {
        this.refs.mask.focus()
      } else {
        this.focusMaskedInput()
      }
    })
  },

  changeGuide({target: {value: guide}}) {
    this.setState({guide: guide === 'true'})
    this.focusMaskedInput()
  },

  changePlaceholderChar({target: {value: placeholderChar}}) {
    this.setState({placeholderChar})
    this.focusMaskedInput()
  },

  focusMaskedInput() {
    const {refs: {maskedInput}} = this
    ReactDOM.findDOMNode(maskedInput).focus()
  },

  findChoice(name, value) {
    return this.state.choices.findIndex((choice) => {
      return choice[name] === value
    })
  },

  onReject(rejectMessage) {
    this.setState({rejectMessage})
  },

  onAccept(acceptMessage) {
    this.setState({acceptMessage})
  }
})
