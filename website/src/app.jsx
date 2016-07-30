import './styles.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import MaskedInput from '../../react/src/reactTextMask.jsx'
import classnames from 'classnames'
import appStyles from './app.scss'
import {choices} from './choices.jsx'
import {Row, DemoTop, DemoBottom} from './partials.jsx'
import {connect} from 'react-redux'
import {actionCreators, selectors} from './redux.js'

const App = React.createClass({
  componentDidUpdate() {
    if (this.props.shouldFocusMaskedInput) {
      this.focusMaskedInput()
    }
  },

  render() {
    const {props} = this

    return (
      <div className={classnames(appStyles.mainContainer, 'container')}>
        <DemoTop/>

        <div>
          <form className='form-horizontal'>
            <Row name="Masked input" value="maskedInput" noHelpLink>
              <MaskedInput
                style={props.textMaskComponentStyle}
                key={props.textMaskComponentUniqueKey}
                placeholder={props.placeholder}
                placeholderChar={props.placeholderChar}
                pipe={props.pipe}
                keepCharPositions={props.keepCharPositions}
                ref='maskedInput'
                mask={props.mask}
                guide={props.guide}
                onReject={() => props.setOnRejectMessage(props.onRejectMessage)}
                onAccept={() => props.setOnAcceptMessage(props.onAcceptMessage)}
                className='form-control'
                id='maskedInput'
              />
            </Row>

            {props.rejectionMessage && (
              <Row><p className='alert alert-warning' style={{margin: 0}}>{props.rejectionMessage}</p></Row>
            )}

            <Row name="Mask" value="mask">
              <select
                className='form-control'
                onChange={({target: {value}}) => props.populateFromChoice(value)}
                ref='maskSelect'
              >
                {choices.map((choice, index) => <option key={index} value={choice.name}>{choice.name}</option>)}
              </select>

              <input
                style={{display: (props.isDynamicMask) ? null : 'none', marginTop: 12}}
                disabled
                type='text'
                value='Dynamic mask'
                className={classnames('form-control', appStyles.mask)}
              />
              <input
                style={{display: (props.isDynamicMask) ? 'none' : null, marginTop: 12}}
                ref='mask'
                type='text'
                onChange={({target: {value: mask}}) => props.setMask(mask)}
                value={props.mask}
                className={classnames('form-control', appStyles.mask)}
                id='mask'
              />
            </Row>

           {props.help && <Row><p className='alert alert-info' style={{margin: 0}}>{props.help}</p></Row>}

            <Row name="Guide" value="guide" small>
              <select
                className='form-control'
                onChange={({target: {value}}) => props.setGuide(value === 'true')}
                value={props.guide}>
                <option value="false">Off</option>
                <option value="true">On</option>
              </select>
            </Row>

            <Row name="Keep character positions" value="keepCharPositions" small>
              <select
                className='form-control'
                onChange={({target: {value}}) => props.setKeepCharPositions(value === 'true')}
                value={props.keepCharPositions}
              >
                <option value='false'>Off</option>
                <option value='true'>On</option>
              </select>
            </Row>

            <Row name="Placeholder character" value="placeholderChar">
              <select
                id='placeholderChar'
                className='form-control'
                onChange={({target: {value: placeholderChar}}) => props.setPlaceholderChar(placeholderChar)}
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

  focusMaskedInput() {
    const {refs: {maskedInput}} = this
    ReactDOM.findDOMNode(maskedInput).focus()
  }
})

export default connect(
  (state) => ({
    ...state,
    textMaskComponentStyle: selectors.getTextMaskComponentStyle(state),
    textMaskComponentUniqueKey: selectors.getTextMaskComponentUniqueKey(state),
    isDynamicMask: selectors.isDynamicMask(state)
  }),
  actionCreators
)(App)
