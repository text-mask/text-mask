import './styles.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import MaskedInput from '../../react/src/reactTextMask.jsx' // eslint-disable-line
import classnames from 'classnames'
import appStyles from './app.scss'
import {initialState, DemoTop, DemoBottom} from './demoHelpers.jsx' // eslint-disable-line

const HelpLink = ({section}) => { // eslint-disable-line
  return (
    <a
      className='small'
      href={`https://github.com/msafi/text-mask/blob/master/componentDocumentation.md#${section}`}
      target='_blank'
    >
      <span className='glyphicon glyphicon-question-sign'/>
    </a>
  )
}

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
      keepCharPositions: stateKeepCharPositions
    } = this.state
    const {
      mask: choiceMask,
      placeholder,
      help,
      pipe,
      value,
      onRejectMessage,
      onAcceptMessage,
      keepCharPositions = stateKeepCharPositions,
      style
    } = choices[selectedChoice]
    const maskedInputKey = JSON.stringify({
      customMask,
      selectedChoice,
      placeholderChar,
      guide,
      keepCharPositions
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
                  pipe={pipe}
                  keepCharPositions={keepCharPositions}
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
                <div className='col-sm-8 col-sm-offset-4'>
                  <p className='alert alert-warning' style={{margin: 0}}>
                    {rejectMessage}
                  </p>
                </div>
              </div>
            )}

            <div className='form-group row'>
              <label
                htmlFor='mask'
                className='col-sm-4 col-xs-12 control-label'>
                Mask <HelpLink section='mask'/>
              </label>

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

              <div className='col-sm-4 col-xs-12'>
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
              <div className='col-sm-8 col-sm-offset-4'>
                <p className='alert alert-info' style={{margin: 0}}>
                  {help}
                </p>
              </div>
            </div>}

            <div className='form-group'>
              <label htmlFor='guide' className='col-sm-4 control-label'>
                Guide <HelpLink section='guide'/>
              </label>

              <div className='col-sm-2'>
                <select className='form-control' onChange={this.changeGuide} value={guide}>
                  <option value={false}>Off</option>
                  <option value={true}>On</option>
                </select>
              </div>
            </div>

            <div className='form-group'>
              <label htmlFor='keepCharPositions' className='col-sm-4 control-label'>
                Keep character positions <HelpLink section='keepcharpositions'/>
              </label>

              <div className='col-sm-2'>
                <select className='form-control' onChange={this.changeKeepCharPositions} value={keepCharPositions}>
                  <option value={false}>Off</option>
                  <option value={true}>On</option>
                </select>
              </div>
            </div>

            <div className='form-group'>
              <label htmlFor='placeholderChar' className='col-sm-4 control-label'>
                Placeholder character <HelpLink section='placeholderchar'/>
              </label>

              <div className='col-sm-3'>
                <select
                  id='placeholderChar'
                  className='form-control'
                  onChange={this.changePlaceholderChar}
                >
                  <option value={'\u2000'}>\u2000 (white space)</option>
                  <option value='_'>_ (underscore)</option>
                </select>
              </div>
            </div>
          </form>

          <hr/>

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

  changeKeepCharPositions({target: {value: keepCharPositions}}) {
    this.setState({keepCharPositions: keepCharPositions === 'true'})
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
