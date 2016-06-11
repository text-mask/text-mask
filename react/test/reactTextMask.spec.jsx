import React from 'react' // eslint-disable-line
import ReactTestUtils from 'react-addons-test-utils'
import {mount} from 'enzyme'
import testParameters, {
  noGuideMode,
  transformTestForComponent
} from '../../common/testParameters.js'
import packageJson from '../package.json'

const MaskedInput = (isVerify()) ? // eslint-disable-line
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

  describe('input render', () => {
    it('should handle an initial value', () => {
      const maskedInput = ReactTestUtils.renderIntoDocument(
        <MaskedInput mask='111-111' value='333333' guide={true}/>
      )
      const input = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

      expect(input.value).to.equal('333-333')
    })
  })

  describe('input change', () => {
    it('calls user provided `onChange` if it exists', () => {
      const userOnChange = sinon.spy()
      const maskedInput = ReactTestUtils.renderIntoDocument(
        <MaskedInput mask='111-111' onChange={userOnChange} guide={true}/>
      )
      const input = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

      input.value = '2___-___'
      input.selectionStart = 1
      input.selectionEnd = 1

      input.focus()
      ReactTestUtils.Simulate.change(input)

      expect(userOnChange.called).to.equal(true)
    })

    it('changes internal value if controlled external value is different than current', () => {
      const userOnChange = sinon.spy()

      const maskedInput = mount(
        <MaskedInput mask='111-111' value='222-222' onChange={userOnChange} guide={true}/>
      )

      let input = maskedInput.find('input').get(0)

      expect(input.value).to.equal('222-222')

      maskedInput.setProps({value: '333-333'})

      input = maskedInput.find('input').get(0)

      expect(input.value).to.equal('333-333')
    })

    it('changes internal value if starts uncontrolled and becomes controlled', () => {
      const userOnChange = sinon.spy()

      const maskedInput = mount(
        <MaskedInput mask='111-111' onChange={userOnChange} guide={true}/>
      )

      let inputWrapper = maskedInput.find('input')
      let input = inputWrapper.get(0)

      input.value = '222-222'
      inputWrapper.simulate('focus')
      inputWrapper.simulate('change')

      expect(userOnChange.called).to.equal(true)

      expect(input.value).to.equal('222-222')

      maskedInput.setProps({value: '333-333'})

      expect(input.value).to.equal('333-333')
    })

    it('calls user provided `onChange` with correct event value', () => {
      const userOnChange = sinon.spy()
      const maskedInput = ReactTestUtils.renderIntoDocument(
        <MaskedInput mask='111-111' onChange={(e) => {
          userOnChange(e)
          expect(e.target.value).to.equal('111-111')
        }} guide={true}/>
      )
      const input = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

      input.value = '111-1111'
      input.selectionStart = 1
      input.selectionEnd = 1

      ReactTestUtils.Simulate.change(input)
      expect(userOnChange.called).to.equal(true)
    })

    it('allows the user to set an empty `placeholder` property', () => {
      const maskedInputWithDefaultPlaceholder = ReactTestUtils.renderIntoDocument(
        <MaskedInput mask='111-111' guide={true}/>
      )

      let input = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInputWithDefaultPlaceholder, 'input')
      expect(input.placeholder).to.equal('___-___')

      const maskedInputWithEmptyPlaceholder = ReactTestUtils.renderIntoDocument(
        <MaskedInput mask='111-111' guide={true} placeholder=''/>
      )

      input = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInputWithEmptyPlaceholder, 'input')
      expect(input.placeholder).to.equal('')
    })

    it('adjusts the position of the caret correctly when it updates', () => {
      const maskedInput = ReactTestUtils.renderIntoDocument(
        <MaskedInput mask='(11)' guide={true}/>
      )
      const input = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

      maskedInput.state.conformedInput = ''
      input.selectionStart = 0
      input.selectionEnd = 0

      input.value = '(2_)'
      input.selectionStart = 4
      input.selectionEnd = 4

      input.focus(input)
      ReactTestUtils.Simulate.change(input)

      expect([
        input.selectionStart,
        input.selectionEnd
      ]).to.deep.equal([2, 2])
    })
  })

  it('sets the value of the input to empty if it conformed input equals placeholder and ' +
     'the caret is at position 0', () => {
    const maskedInput = ReactTestUtils.renderIntoDocument(
      <MaskedInput mask='(11)' guide={true}/>
    )

    const input = ReactTestUtils.findRenderedDOMComponentWithTag(maskedInput, 'input')

    input.value = '(__)'
    input.selectionStart = 0

    input.focus()
    ReactTestUtils.Simulate.change(input)

    input.value = '__)'
    input.selectionStart = 0

    input.focus()
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

            input.value = test.input.userModifiedInputFieldValue
            input.selectionStart = test.input.caretPositionAfterInputFieldValueChange
            input.selectionEnd = test.input.caretPositionAfterInputFieldValueChange

            input.focus()
            ReactTestUtils.Simulate.change(input)

            expect([
              input.value,
              input.selectionStart,
              input.selectionEnd
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

            input.value = test.input.userModifiedInputFieldValue
            input.selectionStart = test.input.caretPositionAfterInputFieldValueChange
            input.selectionEnd = test.input.caretPositionAfterInputFieldValueChange

            input.focus()
            ReactTestUtils.Simulate.change(input)

            expect([
              input.value,
              input.selectionStart,
              input.selectionEnd
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
