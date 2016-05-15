import React from 'react'
import {maskingCharactersWithDescription, maskingCharacters} from '../../../core/src/constants.js'

const Features = React.createClass({
  render() {
    return (
      <div>
        <h2>Features</h2>

        <div>
          <h4>Guided mode</h4>
          <p>blah blah</p>
        </div>

        <div>
          <h4>Unguided mode</h4>
          <p>Blah blah</p>
        </div>

        <div>
          <h4>Masking Characters</h4>
          <table className="table table-striped table-bordered">
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
  }
})

export default Features
