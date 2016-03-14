import React from 'react'
import MaskedInput from '../../../integrations/react/src/reactTextMask.jsx'
import classnames from 'classnames'
import demoStyles from './demo.scss'
import {maskingCharactersWithDescription, maskingCharacters} from '../../../core/src/constants.js'

const Demo = React.createClass({
  getInitialState() {
    const initialState = {
      choices: [{
        value: 'usPhoneNumber',
        name: 'US phone number',
        mask: '(111) 111-1111'
      }, {
        value: 'canadianPostalCode',
        name: 'Canadian postal code',
        mask: 'U1U U1U'
      }, {
        value: 'date',
        name: 'Date',
        mask: '11/11/1111'
      }, {
        value: 'fiveDigitNumber',
        name: 'Five digit number (zip code)',
        mask: '11111'
      }, {
        value: 'threeLetterMonth',
        name: 'Three letter month name',
        mask: 'ULL'
      }],

      mask: '',

      selectedChoice: 0,
    }

    initialState.mask = initialState.choices[initialState.selectedChoice].mask

    return initialState
  },

  render() {
    const {mask} = this.state

    return (
      <div>
        <h2 id="demo">Demo</h2>

        <div className="well">
          <form className="form-horizontal">
            <div className="form-group">
              <label
                className="col-sm-3 control-label"
                htmlFor="maskedInput">Masked input</label>

              <div className="col-sm-9">
                <MaskedInput
                  ref="maskedInput"
                  mask={mask}
                  className="form-control"
                  id="maskedInput"
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="mask"
                className="col-sm-3 control-label">Mask</label>

              <div className="col-sm-5">
                <input
                  ref="mask"
                  type="text"
                  onChange={this.onMaskChange}
                  value={mask}
                  className={classnames('form-control', demoStyles.mask)}
                  id="mask"
                />
              </div>

              <div className="col-sm-4">
                <select className="form-control" onChange={this.onSelectMask} ref="maskSelect">
                  {this.state.choices.map((choice, index) => {
                    return <option key={index} value={choice.value}>{choice.name}</option>
                  })}
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div>
          <table className="table table-striped table-bordered">
            <caption>Masking characters</caption>
            <thead>
            <tr>
              <th>Character</th>
              <th>Description</th>
            </tr>
            </thead>

            <tbody>
            {maskingCharacters.map((maskingCharacter, index) => {
              return (
                <tr key={index}>
                  <td><code>{maskingCharacter}</code></td>
                  <td>{maskingCharactersWithDescription[maskingCharacter]}</td>
                </tr>
              )
            })}
            </tbody>

          </table>
        </div>
      </div>
    )
  },

  onMaskChange({target: {value: mask}}) {
    const choice = this.findChoice('mask', mask)

    if (choice !== undefined) {
      this.refs.maskSelect.value = choice.value
    } else {
      this.refs.maskSelect.value = 'custom'
    }

    this.changeMask(mask)
  },

  onSelectMask({target: {value: selectValue}}) {
    if (selectValue !== 'custom'){
      this.changeMask(this.findChoice('value', selectValue).mask)
      this.refs.maskedInput.refs.inputElement.focus()
    } else {
      this.refs.mask.value = ''
      this.refs.mask.focus()
    }
  },

  changeMask(mask) {
    this.setState({mask})
  },

  findChoice(name, value) {
    return this.state.choices.find((choice) => {
      return choice[name] === value
    })
  }
})

export default Demo
