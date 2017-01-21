import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import packageJson from '../package.json'

const MaskedInput = (isVerify()) ?
  require(`../${packageJson.main}`).default :
  require('../src/reactTextMask.jsx').default

describe('MaskedInput', () => {
  it('does not throw when instantiated', () => {
    expect(() => ReactTestUtils.renderIntoDocument(
      <MaskedInput mask='111-111' guide={true}/>
    )).not.to.throw()
  })

  it('renders a single input element', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput mask='111-111' guide={true}/>
    )

    expect(
      () => ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')
    ).not.to.throw()
  })
})
