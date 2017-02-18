import './styles.scss'
import React from 'react'
import {connect} from 'react-redux'
import {Links, Panel, Row} from './partials'

const MaskFunctionDefinition = ({maskLink}) => (
  <div>
    <p>
      This is a <Links.maskFunction/>, which means it reads user input first and based on user input,
      it returns the mask array.
    </p>

    <p>
      The mask function used in this configuration is {maskLink}, which is
      available as an <Links.addon/>.
    </p>
  </div>
)

const HelpPanel = React.createClass({
  render() {
    const {props} = this

    return (
      props.choiceName === 'Date (auto-corrected)' && (
        <Row>
          <Panel title='Piped'>
            <p>
              User input in this configuration is passed through a <Links.pipe/> that auto-corrects some values. For
              example,
              if you enter <code>9</code> in the 1st digit of the month, it'll auto-correct it to <code>09</code>. Or
              if you enter <code>0</code> in the 1st digit of the year, it'll auto-correct it to <code>200</code>.
            </p>

            <p>
              It is using <Links.createAutoCorrectedDatePipe />, which is available as an <Links.addon/>.
            </p>
          </Panel>
        </Row>
      ) || props.mask.instanceOf === 'createNumberMask' && (
        <Row>
          <Panel title='Mask function'>
            <MaskFunctionDefinition maskLink={<Links.createNumberMask/>} />

            <p style={{marginBottom: 0}}>
              <code>createNumberMask</code> can be used to mask amounts, currencies, percentages, and more.
            </p>
          </Panel>
        </Row>
      )
    ) || props.choiceName === 'Canadian postal code' && (
      <Row>
        <Panel title='Piped'>
          <p>
            User input in this configuration is passed through a <Links.pipe/> that upper-cases it.
          </p>

          <p>
            The pipe in this case is a function such as:
          </p>

          <pre>{'function upperCasePipe(conformedValue) {\n  return conformedValue.toUpperCase()\n}'}</pre>
        </Panel>
      </Row>
    ) || props.choiceName === 'Email' && (
      <Row>
        <Panel title='Mask function'>
          <MaskFunctionDefinition maskLink={<Links.emailMask/>}/>
        </Panel>
      </Row>
    )
  }
})

export default connect((state) => ({choiceName: state.name, mask: state.mask}))(HelpPanel)
