import './styles.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import MaskedInput from '../../react/src/reactTextMask'
import classnames from 'classnames'
import appStyles from './app.scss'
import choices from './choices'
import {Row, DemoTop, DemoBottom, OnOffSwitch} from './partials'
import {connect} from 'react-redux'
import {actionCreators, selectors} from './redux'
import HelpPanel from './helpPanel'

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
            <Row name='Masked input' value='maskedInput' noHelpLink>
              <MaskedInput
                value={props.value}
                style={props.textMaskComponentStyle}
                key={props.textMaskComponentUniqueKey}
                placeholder={props.placeholder}
                placeholderChar={props.placeholderChar}
                pipe={props.pipe}
                keepCharPositions={props.keepCharPositions}
                ref='maskedInput'
                mask={props.mask}
                guide={props.guide}
                onChange={({target: {value}}) => props.setValue(value)}
                className='form-control'
                id='maskedInput'
              />
            </Row>

            {props.rejectionMessage && (
              <Row><p className='alert alert-warning' style={{margin: 0}}>{props.rejectionMessage}</p></Row>
            )}

            <Row name='Mask' value='mask'>
              <select
                className='form-control'
                value={props.name}
                onChange={({target: {value}}) => props.populateFromChoice(value)}
                ref='maskSelect'
              >
                {choices.map((choice, index) => <option key={index} value={choice.name}>{choice.name}</option>)}
              </select>

              <input
                style={{
                  display: (props.isMaskFunction) ? 'none' : null,
                  marginTop: 12,
                  fontFamily: 'monospace',
                  cursor: 'default'
                }}
                ref='mask'
                type='text'
                disabled
                onChange={({target: {value: mask}}) => props.setMask(mask)}
                value={convertMaskForDisplay(props.mask)}
                className='form-control'
                id='mask'
              />
            </Row>

            <HelpPanel/>

            <Row name='Guide' value='guide' small>
              <OnOffSwitch
                name='guide'
                value={props.guide}
                onChange={(value) => props.setGuide(value)}
              />
            </Row>

            <Row name='Keep character positions' value='keepcharpositions' small>
              <OnOffSwitch
                name='keepCharPositions'
                value={props.keepCharPositions}
                onChange={(value) => props.setKeepCharPositions(value)}
              />
            </Row>

            <Row name='Placeholder character' value='placeholderchar'>
              <select
                id='placeholderChar'
                className='form-control'
                value={props.placeholderChar}
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
    isMaskFunction: selectors.isMaskFunction(state)
  }),
  actionCreators
)(App)

function convertMaskForDisplay(mask) {
  let displayMask = mask
    .toString()
    .split(',')
    .map((element) => {
      return (element[0] === '/' && element.length > 1) ? element : `'${element}'`
    })
    .join(', ')

  return `[${displayMask}]`
}
