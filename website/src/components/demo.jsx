import React from 'react'
import MaskedTextInput from '../../../integrations/react/src/MaskedTextInput.jsx'
//import MaskedTextInput from '@msafi/react-text-mask'

const MASK = '(111) 111-1111'

const Demo = React.createClass({
  getInitialState() {
    return {
      mask: MASK
    }
  },

  render() {
    return (
      <div>
        <h2 id="demo">Demo</h2>

        <p>
          The only masking character is <code>1</code>, which stands for: <em>single numeric character</em>.
        </p>

        <div className="row">
          <form className="col-sm-12 col-md-4 col-md-offset-4 well">
            <div className="form-group">
              <label htmlFor="maskedInput">Masked input</label>

              <MaskedTextInput
                mask={this.state.mask}
                className="form-control"
                id="maskedInput"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mask"
                     style={{fontSize: '90%', marginTop: '3px'}}
                     className="col-sm-3 control-label">Mask</label>

              <div className="col-sm-9">
                <input
                  style={{height: '26px', fontSize: '90%'}}
                  type="text"
                  onChange={this.onMaskChange}
                  value={this.state.mask}
                  className="form-control"
                  id="mask"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  },

  onMaskChange(event) {
    this.setState({mask: event.target.value})
  }
})

export default Demo
