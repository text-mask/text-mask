import packageJson from '../package.json'
import isVerify from '../../../common/isVerify.js'
import chai from 'chai'
import React from 'react'
import sinon from 'sinon'
import _ from 'lodash'
import ReactTestUtils from 'react-addons-test-utils'
import dynamicTests from 'mocha-dynamic-tests'
import testParameters from '../../../common/testParameters.js'

const MaskedInput = (isVerify()) ?
  require(`../${packageJson.main}`).default :
  require('../src/reactTextMask.jsx').default

const expect = chai.expect

describe('MaskedInput', () => {
  it('does not throw when instantiated', () => {
    expect(() => ReactTestUtils.renderIntoDocument(
      <MaskedInput mask="111-111"/>
    )).not.to.throw()
  })

  it('renders a single input element', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput mask="111-111"/>
    )

    expect(
      () => ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')
    ).not.to.throw()
  })

  describe('input change', () => {
    it('calls user provided `onChange` if it exists', () => {
      const userOnChange = sinon.spy()
      const maskedInput = ReactTestUtils.renderIntoDocument(
        <MaskedInput mask="111-111" onChange={userOnChange}/>
      )
      const input = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

      input.value = '2___-___'
      input.selectionStart = 1
      input.selectionEnd = 1

      ReactTestUtils.Simulate.change(input)

      expect(userOnChange.called).to.equal(true)
    })

    it('adjusts the position of the caret correctly when it updates', () => {
      const maskedInput = ReactTestUtils.renderIntoDocument(
        <MaskedInput mask="(11)"/>
      )
      const input = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

      input.value = '(2_)'
      input.selectionStart = 1
      input.selectionEnd = 1

      maskedInput.refs.inputElement.focus()

      ReactTestUtils.Simulate.change(input)

      expect([
        maskedInput.refs.inputElement.selectionStart,
        maskedInput.refs.inputElement.selectionEnd
      ]).to.deep.equal([2,2])
    })

    it('does not attempt to update the position of the caret when the input is not focused', () => {
      const maskedInput = ReactTestUtils.renderIntoDocument(
        <MaskedInput mask="(11)"/>
      )
      const input = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

      input.value = '(2_)'
      input.selectionStart = 1
      input.selectionEnd = 1

      ReactTestUtils.Simulate.change(input)

      expect([
        maskedInput.refs.inputElement.selectionStart,
        maskedInput.refs.inputElement.selectionEnd
      ]).to.deep.equal([1, 1])
    })
  })

  it('never sets the value of the input to empty mask', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(<MaskedInput mask="(11)"/>)

    const input = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

    input.value = '(__)'

    ReactTestUtils.Simulate.change(input)

    expect(input.value).to.equal('')
  })

  dynamicTests(
    _.filter(
      testParameters,
      (testParameter) => {
        return !(
          _.isArray(testParameter.skips) && (
            _.includes(testParameter.skips, 'adjustCaretPosition') ||
            _.includes(testParameter.skips, 'integrations:react')
          )
        )
      }
    ),

    (test) => {
      return {
        description: JSON.stringify(test),

        body: () => {
          const maskedInput = ReactTestUtils.renderIntoDocument(
            <MaskedInput mask={test.input.mask} />
          )

          const input = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

          input.value = test.input.startingInputFieldValue
          input.selectionStart = 0
          input.selectionEnd = 0

          maskedInput.refs.inputElement.focus()

          ReactTestUtils.Simulate.change(input)

          input.value = test.input.userModifiedInputFieldValue
          input.selectionStart = test.input.caretPositionAfterInputFieldValueChange
          input.selectionEnd = test.input.caretPositionAfterInputFieldValueChange

          maskedInput.refs.inputElement.focus()

          ReactTestUtils.Simulate.change(input)

          expect([
            input.value,
            maskedInput.refs.inputElement.selectionStart,
            maskedInput.refs.inputElement.selectionEnd
          ]).to.deep.equal([
            test.output.conformedInputFieldValue,
            test.output.adjustedCaretPosition,
            test.output.adjustedCaretPosition
          ])
        }
      }
    }
  )
})
