import React from 'react'
import MaskedInput from './input.jsx'

const PATTERN = '(111) 111-1111'

const Demo = React.createClass({
  getInitialState() {
    return {
      pattern: PATTERN
    }
  },

  render() {
    return (
      <div>
        <h2 id="demo">Demo</h2>

        <p>The library is currently pretty limited in features.</p>

        <p>
          The only masking character is <code>1</code>, which stands for: <em>any character</em>.
        </p>

        <div className="row">
          <form className="col-sm-12 col-md-4 col-md-offset-4 well">
            <div className="form-group">
              <label htmlFor="maskedInput">Masked input</label>

              <MaskedInput
                pattern={this.state.pattern}
                className="form-control"
                id="maskedInput"
              />
            </div>

            <div className="form-group">
              <label htmlFor="pattern"
                     style={{fontSize: '90%', marginTop: '3px'}}
                     className="col-sm-3 control-label">Pattern</label>

              <div className="col-sm-9">
                <input
                  style={{height: '22px', fontSize: '90%'}}
                  type="text"
                  onChange={this.onPatternChange}
                  value={this.state.pattern}
                  className="form-control"
                  id="pattern"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  },

  onPatternChange(event) {
    this.setState({pattern: event.target.value})
  }
})

export default Demo
