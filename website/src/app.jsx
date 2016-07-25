import './styles.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import MaskedInput from '../../react/src/reactTextMask.jsx' // eslint-disable-line
import classnames from 'classnames'
import appStyles from './app.scss'
import {initialState} from './choices.jsx' // eslint-disable-line
import {Row, DemoTop, DemoBottom} from './partials.jsx'
import {connect} from 'react-redux'
import {actions, selectors} from './redux.js'

const App = React.createClass({ // eslint-disable-line
  getInitialState() {
    return Object.assign({})
  },

  render() {
    const {mask} = this.props
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
            <Row name="Masked input" value="maskedInput" noHelpLink>
              <MaskedInput
                style={style}
                key={maskedInputKey}
                placeholder={placeholderValue}
                placeholderChar={placeholderChar}
                pipe={pipe}
                keepCharPositions={keepCharPositions}
                ref='maskedInput'
                mask={mask}
                guide={guide}
                onReject={() => this.onReject(onRejectMessage)}
                onAccept={() => this.onAccept(onAcceptMessage)}
                className='form-control'
                id='maskedInput'
              />
            </Row>

            {rejectMessage && <Row><p className='alert alert-warning' style={{margin: 0}}>{rejectMessage}</p></Row>}

            <Row name="Mask" value="mask">
              <select
                className='form-control'
                value={value}
                onChange={this.onDropDownListChoiceSelect}
                ref='maskSelect'>
                {choices.map((choice, index) => {
                  return <option key={index} value={choice.value}>{choice.name}</option>
                })}
              </select>

              <input
                style={{display: (isDynamicMask) ? null : 'none', marginTop: 12}}
                disabled
                type='text'
                value='Dynamic mask'
                className={classnames('form-control', appStyles.mask)}
              />
              <input
                style={{display: (isDynamicMask) ? 'none' : null, marginTop: 12}}
                ref='mask'
                type='text'
                onChange={this.onManualMaskChange}
                value={mask}
                className={classnames('form-control', appStyles.mask)}
                id='mask'
              />
            </Row>

            {help !== undefined && <Row><p className='alert alert-info' style={{margin: 0}}>{help}</p></Row>}

            <Row name="Guide" value="guide" small>
              <select className='form-control' onChange={this.changeGuide} value={guide}>
                <option value={false}>Off</option>
                <option value={true}>On</option>
              </select>
            </Row>

            <Row name="Keep character positions" value="keepCharPositions" small>
              <select className='form-control' onChange={this.changeKeepCharPositions} value={keepCharPositions}>
                <option value={false}>Off</option>
                <option value={true}>On</option>
              </select>
            </Row>

            <Row name="Placeholder character" value="placeholderChar">
              <select
                id='placeholderChar'
                className='form-control'
                onChange={this.changePlaceholderChar}
              >
                <option value={'\u2000'}>\u2000 (white space)</option>
                <option value='_'>_ (underscore)</option>
              </select>
            </Row>
          </form>

          <hr/>

          <DemoBottom/>
        </div>
      </div>
    )
  },

  onManualMaskChange({target: {value: customMask}}) {
    const {setMask} = this.props

    setMask(customMask)

    // const selectedChoice = this.findChoice('mask', customMask)
    // const customChoice = this.findChoice('value', 'custom')
    // const finalSelectedChoice = (selectedChoice !== -1) ?
    //   selectedChoice :
    //   customChoice
    //
    // this.setState({
    //   customMask,
    //   selectedChoice: finalSelectedChoice,
    //   rejectMessage: null,
    //   acceptMessage: null
    // })
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

export default connect(
  (state) => ({
    mask: state.mask,
    textMaskComponentUniqueKey: selectors.getTextMaskComponentUniqueKey(state),
    textMaskConfigurations: selectors.getTextMaskConfigurations(state)
  }),
  actions
)(App)
