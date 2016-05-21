import packageJson from '../package.json'
import isVerify from '../../common/isVerify.js'
import chai from 'chai'
import React from 'react'
import sinon from 'sinon'
import _ from 'lodash'
import ReactTestUtils from 'react-addons-test-utils'
import dynamicTests from 'mocha-dynamic-tests'
import testParameters, {
  noGuideMode, 
  transformTestForComponent
} from '../../common/testParameters.js'

const MaskedInput = (isVerify()) ?
  require(`../${packageJson.main}`).default :
  require('../src/reactTextMask.jsx').default

const expect = chai.expect

describe('MaskedInput', () => {
  it('does not throw when instantiated', () => {
    expect(() => ReactTestUtils.renderIntoDocument(
      <MaskedInput mask="111-111" guide={true}/>
    )).not.to.throw()
  })

  it('renders a single input element', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput mask="111-111" guide={true}/>
    )

    expect(
      () => ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')
    ).not.to.throw()
  })

  describe('input change', () => {
    it('calls user provided `onChange` if it exists', () => {
      const userOnChange = sinon.spy()
      const maskedInput = ReactTestUtils.renderIntoDocument(
        <MaskedInput mask="111-111" onChange={userOnChange} guide={true}/>
      )
      const input = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

      input.value = '2___-___'
      input.selectionStart = 1
      input.selectionEnd = 1

      maskedInput.refs.inputElement.focus()
      ReactTestUtils.Simulate.change(input)

      expect(userOnChange.called).to.equal(true)
    })

    it('adjusts the position of the caret correctly when it updates', () => {
      const maskedInput = ReactTestUtils.renderIntoDocument(
        <MaskedInput mask="(11)" guide={true}/>
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
  })

  it('sets the value of the input to empty if it conformed input equals placeholder and ' +
     'the caret is at position 0', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput mask="(11)" guide={true}/>
    )

    const input = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

    input.value = '(__)'
    input.selectionStart = 0

    maskedInput.refs.inputElement.focus()
    ReactTestUtils.Simulate.change(input)

    input.value = '__)'
    input.selectionStart = 0

    maskedInput.refs.inputElement.focus()
    ReactTestUtils.Simulate.change(input)

    expect(input.value).to.equal('')
  })

  describe('Guide mode', () => {
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
              <MaskedInput mask={test.input.mask} guide={true}/>
            )

            const input = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

            maskedInput.state.conformedInput = test.input.startingInputFieldValue
            input.selectionStart = 0
            input.selectionEnd = 0

            // It's unrealistic to trigger change when there's no starting user input
            // That is, input starts with empty value. We cannot change it from that to empty value
            // because it already is empty.
            if (input.value.length > 0) {
              maskedInput.refs.inputElement.focus()
              ReactTestUtils.Simulate.change(input)
            }

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
              transformTestForComponent(test).conformedInputFieldValue,
              test.output.adjustedCaretPosition,
              test.output.adjustedCaretPosition
            ])
          }
        }
      }
    )
  })

  describe('No guide mode', () => {
    dynamicTests(
      _.filter(
        noGuideMode,
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
              <MaskedInput mask={test.input.mask} guide={false}/>
            )

            const input = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

            maskedInput.state.conformedInput = test.input.startingInputFieldValue
            input.selectionStart = 0
            input.selectionEnd = 0

            // It's unrealistic to trigger change when there's no starting user input
            // That is, input starts with empty value. We cannot change it from that to empty value
            // because it already is empty.
            if (input.value.length > 0) {
              maskedInput.refs.inputElement.focus()
              ReactTestUtils.Simulate.change(input)
            }

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
              transformTestForComponent(test).conformedInputFieldValue,
              test.output.adjustedCaretPosition,
              test.output.adjustedCaretPosition
            ])
          }
        }
      }
    )
  })
})
