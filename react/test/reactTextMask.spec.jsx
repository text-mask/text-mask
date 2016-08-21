import React from 'react'
import packageJson from '../package.json'
import { mount } from "enzyme";

const MaskedInput = (isVerify()) ?
  require(`../${packageJson.main}`).default :
  require('../src/reactTextMask.jsx').default

describe('MaskedInput', () => {
  it('does not throw when instantiated', () => {
    expect(() => mount(
      <MaskedInput mask={[/\d/, /\d/, /\d/, /\d/]} guide={true}/>
    )).not.to.throw()
  })

  it('renders a single input element', () => {
    const maskedInput = mount(
      <MaskedInput mask={[/\d/, /\d/, /\d/, /\d/]} guide={true}/>
    )

    expect(maskedInput.find('input').length).to.equal(1)
  })

  it('renders a single custom input element', () => {
    const Input = (props) => <input {...props} data-custom="true" />
    const maskedInput = mount(
      <MaskedInput mask={[/\d/, /\d/, /\d/, /\d/]} guide={true} inputElement={Input}/>
    )

    expect(maskedInput.find('input').length).to.equal(1)
    expect(maskedInput.find('input').prop('data-custom')).to.equal('true')
      
  })
})
