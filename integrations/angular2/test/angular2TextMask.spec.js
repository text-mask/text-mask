import 'reflect-metadata'

import packageJson from '../package.json'
import isVerify from '../../../common/isVerify.js'
import chai from 'chai'
import _ from 'lodash'
import dynamicTests from 'mocha-dynamic-tests'
import testParameters from '../../../common/testParameters.js'

const MaskedInput = (isVerify()) ?
  require(`../${packageJson.main}`).default :
  require('../dist/textMask.js').default

const expect = chai.expect

const longString = new Array(100).join('#')

describe('MaskedInput', () => {
  let inputElement
  let ngModel
  let modelValue = ''

  beforeEach(() => {
    inputElement = document.createElement('input')

    // It's impossible to set `inputElement.selectionStart` and `inputElement.selectionEnd`
    // to a value that is shorter than `inputElement.value`. And in our tests, we do not test
    // `inputElement.value` directly. We test through `ngModel`, so `inputElement.value` stays
    // empty in our tests, which prevents us from setting caret position.
    //
    // Setting `inputElement.value` to this long string allows us to set and test caret
    // position adjustments
    inputElement.value = longString

    modelValue = ''

    ngModel = {
      valueAccessor: {
        writeValue(_value) {
          modelValue = _value
        }
      }
    }
  })

  it('does not throw when instantiated', () => {
    expect(() => {
      const maskedInput = new MaskedInput({nativeElement: inputElement})

      return maskedInput
    }).not.to.throw()
  })

  describe('input change', () => {
    it('updates the model correctly', () => {
      const maskedInput = new MaskedInput({nativeElement: inputElement}, ngModel)

      maskedInput.textMaskConfig.mask = '(111)'

      inputElement.selectionStart = 0
      inputElement.selectionEnd = 0

      maskedInput.onInput('2')

      expect(modelValue).to.equal('(2__)')
    })

    it('adjusts the position of the caret correctly when it updates', () => {
      const maskedInput = new MaskedInput({nativeElement: inputElement}, ngModel)

      maskedInput.textMaskConfig.mask = '(111)'

      inputElement.selectionStart = 0
      inputElement.selectionEnd = 0

      maskedInput.onInput('2')

      expect([
        inputElement.selectionStart,
        inputElement.selectionEnd
      ]).to.deep.equal([2, 2])
    })
  })

  it('never sets the value of the input to equal the placeholder', () => {
    const maskedInput = new MaskedInput({nativeElement: inputElement}, ngModel)

    maskedInput.placeholder = '(__)'
    maskedInput.textMaskConfig.mask = '(11)'

    maskedInput.onInput('(__)')

    expect(modelValue).to.equal('')
  })

  dynamicTests(
    _.filter(
      testParameters,
      (testParameter) => {
        return !(
          _.isArray(testParameter.skips) && (
            _.includes(testParameter.skips, 'adjustCaretPosition') ||
            _.includes(testParameter.skips, 'integrations:angular2')
          )
        )
      }
    ),

    (test) => {
      return {
        description: JSON.stringify(test),

        body: () => {
          const maskedInput = new MaskedInput({nativeElement: inputElement}, ngModel)

          maskedInput.textMaskConfig.mask = test.input.mask

          maskedInput.previousValue = test.input.startingInputFieldValue

          inputElement.selectionStart = test.input.caretPositionAfterInputFieldValueChange
          inputElement.selectionEnd = test.input.caretPositionAfterInputFieldValueChange

          maskedInput.onInput(test.input.userModifiedInputFieldValue)

          expect([
            modelValue,
            inputElement.selectionStart,
          ]).to.deep.equal([
            test.output.conformedInputFieldValue,
            test.output.adjustedCaretPosition,
          ])
        }
      }
    }
  )
})
