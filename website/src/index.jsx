import './styles.scss'
import ReactDOM from 'react-dom'
import React from 'react';
import MaskedInput from '../../react/src/reactTextMask.jsx'
import classnames from 'classnames'
import appStyles from './app.scss'

const App = React.createClass({
  getInitialState() {
    const initialState = {
      choices: [{
        value: 'usPhoneNumber',
        name: 'US phone number',
        mask: '(111) 111-1111',
        placeholder: '(555) 495-3947'
      }, {
        value: 'canadianPostalCode',
        name: 'Canadian postal code',
        mask: 'U1U 1U1',
        placeholder: 'K1A 0B2'
      }, {
        value: 'date',
        name: 'Date',
        mask: '11/11/1111',
        placeholder: '25/09/1970'
      }, {
        value: 'fiveDigitNumber',
        name: 'Five digit number (zip code)',
        mask: '11111',
        placeholder: '94303'
      }, {
        value: 'threeLetterMonth',
        name: 'Three letter month name',
        mask: 'ULL',
        placeholder: 'Mar'
      }],

      selectedChoice: 0,

      guide: false,
    }

    initialState.mask = initialState.choices[initialState.selectedChoice].mask

    return initialState
  },

  render() {
    const {guide, choices, selectedChoice, mask} = this.state
    const {maskSelect} = this.refs
    const placeholder = (
      guide === false && (maskSelect === undefined || maskSelect.value !== 'custom')
    ) ? `Example ${choices[selectedChoice].placeholder}` : ''
    const githubLink = "https://github.com/msafi/text-mask/#readme"

    return (
      <div className={classnames(appStyles.mainContainer, 'container')}>
        <p>
          <img
            src="./assets/logo.png"
            alt="Text Mask"
            className="img-responsive"
            width="331"
            height="67"/>
        </p>

        <p>
          This is just a demo. Try filling out the masked input field.
          Try entering bad characters. Pasting. Deleting.
          Or using auto-fill. Try it on mobile too.
        </p>

        <div>
          <form className="form-horizontal">
            <div className="form-group">
              <label
                className="col-sm-3 control-label"
                htmlFor="maskedInput">Masked input</label>

              <div className="col-sm-9">
                <MaskedInput
                  placeholder={placeholder}
                  ref="maskedInput"
                  mask={mask}
                  guide={guide}
                  className="form-control"
                  id="maskedInput"
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                htmlFor="mask"
                className="col-sm-3 col-xs-12 control-label">Mask</label>

              <div className="col-sm-4 col-xs-12">
                <select
                  className="form-control"
                  onChange={this.onDropDownListMaskSelect}
                  ref="maskSelect">
                  {this.state.choices.map((choice, index) => {
                    return <option key={index} value={choice.value}>{choice.name}</option>
                  })}
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div className="col-sm-5 col-xs-12">
                <input
                  ref="mask"
                  type="text"
                  onChange={this.onManualMaskChange}
                  value={mask}
                  className={classnames('form-control', appStyles.mask)}
                  id="mask"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="guide" className="col-sm-3 control-label">Guide</label>

              <div className="col-sm-2">
                <select className="form-control" onChange={this.changeGuide} ref="guideSelect">
                  <option value="off">Off</option>
                  <option value="on">On</option>
                </select>
              </div>
            </div>
          </form>

          <p>
            For more information about
            installation, usage, and documentation, see the <a href={githubLink}>GitHub page</a>.
          </p>
        </div>
      </div>
    )
  },

  onManualMaskChange({target: {value: mask}}) {
    const {state: {choices}, refs: {maskSelect}} = this
    const selectedChoice = this.findChoice('mask', mask)
    const choice = choices[selectedChoice]

    if (choice !== undefined) {
      maskSelect.value = choice.value
    } else {
      maskSelect.value = 'custom'
    }

    this.setState({mask, selectedChoice})
  },

  onDropDownListMaskSelect({target: {value: selectValue}}) {
    const {
      state: {choices},
      refs: {maskedInput: {refs: {inputElement}}, mask},
      findChoice
    } = this

    if (selectValue !== 'custom') {
      const selectedChoice = findChoice('value', selectValue)

      this.setState({selectedChoice, mask: choices[selectedChoice].mask})

      inputElement.focus()
    } else {
      mask.value = ''
      mask.focus()
    }
  },

  changeGuide({target: {value: guideValue}}) {
    const {refs: {maskedInput: {refs: {inputElement}}}} = this

    this.setState({guide: guideValue === 'on'})

    inputElement.focus()
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
);
