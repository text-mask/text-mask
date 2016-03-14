import chai from 'chai'
import maskInput from '../src/vanillaTextMask.js'
import dynamicTests from 'mocha-dynamic-tests'
import testParameters from '../../../core/test/testParameters.js'
import _ from 'lodash'

const expect = chai.expect

describe('inputMask', () => {
  it('does not throw when instantiated', () => {
    const inputElement = document.createElement('input')

    expect(() => maskInput({
      element: inputElement,
      mask: '111'
    })).not.to.throw()
  })

  describe('input change', () => {
    it('adjusts the position of the caret correctly when it updates', () => {
      const inputElement = document.createElement('input')

      maskInput({
        element: inputElement,
        mask: '(111) 111-1111'
      })

      inputElement.focus()
      inputElement.value = '4'
      inputElement.oninput()

      expect([
        inputElement.selectionStart,
        inputElement.selectionEnd
      ]).to.deep.equal([2,2])
    })

    it('does not attempt to update the position of the caret when the input is not focused', () => {
      const inputElement = document.createElement('input')

      maskInput({
        element: inputElement,
        mask: '(111) 111-1111'
      })

      inputElement.value = '4'
      inputElement.oninput()

      expect([
        inputElement.selectionStart,
        inputElement.selectionEnd
      ]).to.deep.equal([0, 0])
    })
  })

  it('does not set the value of the input to empty mask', () => {
    const inputElement = document.createElement('input')

    maskInput({
      element: inputElement,
      mask: '(11)'
    })

    inputElement.value = '(__)'
    inputElement.oninput()

    expect(inputElement.value).to.equal('')
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
          const inputElement = document.createElement('input')

          maskInput({
            element: inputElement,
            mask: test.input.mask
          })

          inputElement.focus()
          inputElement.value = test.input.startingInputFieldValue
          inputElement.oninput()

          inputElement.value = test.input.userModifiedInputFieldValue
          inputElement.selectionStart = test.input.caretPositionAfterInputFieldValueChange
          inputElement.selectionEnd = test.input.caretPositionAfterInputFieldValueChange

          inputElement.focus()
          inputElement.oninput()

          expect([
            inputElement.value,
            inputElement.selectionStart,
            inputElement.selectionEnd
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
