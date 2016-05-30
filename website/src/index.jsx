import './styles.scss'
import ReactDOM from 'react-dom'
import React from 'react'
import MaskedInput from '../../react/src/reactTextMask.jsx' // eslint-disable-line
import classnames from 'classnames'
import appStyles from './app.scss'
import {initialState, DemoTop, DemoBottom} from './demoHelpers.jsx' // eslint-disable-line

const App = React.createClass({ // eslint-disable-line
  getInitialState() {
    return Object.assign(initialState, {
      mask: initialState.choices[initialState.selectedChoice].mask
    })
  },

  render() {
    const {guide, choices, placeholder, value, mask, placeholderChar} = this.state

    const placeholderValue = guide ? undefined : placeholder

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
                  placeholder={placeholderValue}
                  placeholderCharacter={placeholderChar}
                  ref='maskedInput'
                  mask={mask}
                  guide={guide}
                  className='form-control'
                  id='maskedInput'
                />
              </div>
            </div>

            <div className='form-group row'>
              <label
                htmlFor='mask'
                className='col-sm-3 col-xs-12 control-label'>Mask</label>

              <div className='col-sm-4 col-xs-12'>
                <select
                  className='form-control'
                  value={value}
                  onChange={this.onDropDownListMaskSelect}
                  ref='maskSelect'>
                  {choices.map((choice, index) => {
                    return <option key={index} value={choice.value}>{choice.name}</option>
                  })}
                </select>
              </div>

              <div className='col-sm-5 col-xs-12'>
                <input
                  ref='mask'
                  type='text'
                  onChange={this.onManualMaskChange}
                  value={mask}
                  className={classnames('form-control', appStyles.mask)}
                  id='mask'
                />
              </div>
            </div>

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
                    <option value='_'>_ (underscore)</option>
                    <option value={'\u2000'}>White space</option>
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

  onManualMaskChange({target: {value: mask}}) {
    this.setState({mask})
  },

  onDropDownListMaskSelect({target: {value: selectValue}}) {
    const {state: {choices}, findChoice} = this
    const selectedChoice = findChoice('value', selectValue)
    this.setState(Object.assign({}, choices[selectedChoice]))
    if (selectValue === 'custom') {
      return this.refs.mask.focus()
    }
    this.focusMaskedInput()
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
    ReactDOM.findDOMNoe(maskedInput).focus()
  },

  findChoice(name, value) {
    return this.state.choices.findIndex((choice) => {
      return choice[name] === value
    })
  }
})

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
