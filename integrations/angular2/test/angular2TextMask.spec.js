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

describe('MaskedInput', () => {
  let inputElement

  beforeEach(() => {
    inputElement = document.createElement('input')
  })

  it('does not throw when instantiated', () => {
    expect(() => {
      const maskedInput = new MaskedInput({nativeElement: inputElement})

      return maskedInput
    }).not.to.throw()
  })

  describe('input change', () => {
    it('adjusts the position of the caret correctly when it updates', () => {
      const maskedInput = new MaskedInput({nativeElement: inputElement})

      maskedInput.textMaskConfig.mask = '(111)'

      inputElement.selectionStart = 0
      inputElement.selectionEnd = 0

      maskedInput.onChange('2')

      expect([
        inputElement.value,
        inputElement.selectionStart,
        inputElement.selectionEnd
      ]).to.deep.equal(['(2__)', 2, 2])
    })
  })

  it('never sets the value of the input to empty mask', () => {
    const maskedInput = new MaskedInput({nativeElement: inputElement})

    maskedInput.textMaskConfig.mask = '(11)'

    maskedInput.onChange('(__)')

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
          const maskedInput = new MaskedInput({nativeElement: inputElement})

          maskedInput.textMaskConfig.mask = test.input.mask

          maskedInput.previousValue = test.input.startingInputFieldValue

          // It's impossible to set selectionStart and selectionEnd to a value
          // that is shorter than the than the string in `value`. That's why this
          // ensures that the string in `value` is long enough. It adds a random string to it
          // to ensure not fool the test assertion which actually expects the correct
          // result in `value`
          inputElement.value = test.input.userModifiedInputFieldValue + 'HAHAHAHAHA'

          inputElement.selectionStart = test.input.caretPositionAfterInputFieldValueChange
          inputElement.selectionEnd = test.input.caretPositionAfterInputFieldValueChange

          maskedInput.onChange(test.input.userModifiedInputFieldValue)

          expect([
            inputElement.value,
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
