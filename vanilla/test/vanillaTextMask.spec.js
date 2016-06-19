import testParameters, {
  transformTestForComponent,
  noGuideMode
} from '../../common/testParameters.js'
import packageJson from '../package.json'

const maskInput = (isVerify()) ?
  require(`../${packageJson.main}`).default :
  require('../src/vanillaTextMask.js').default

describe('inputMask', () => {
  it('does not throw when instantiated', () => {
    const inputElement = document.createElement('input')

    expect(() => maskInput({
      inputElement,
      mask: '111',
      guide: true,
    })).not.to.throw()
  })

  describe('input change', () => {
    it('adjusts the position of the caret correctly when it updates', () => {
      const inputElement = document.createElement('input')

      const maskedInput = maskInput({
        inputElement,
        mask: '(111) 111-1111',
        guide: true,
      })

      inputElement.focus()
      inputElement.value = '4'
      inputElement.selectionStart = 1
      maskedInput.update()

      expect([
        inputElement.selectionStart,
        inputElement.selectionEnd
      ]).to.deep.equal([2, 2])
    })

    it('does not attempt to update the position of the caret when the input is not focused', () => {
      const inputElement = document.createElement('input')

      const maskedInput = maskInput({
        inputElement,
        mask: '(111) 111-1111',
        guide: true,
      })

      inputElement.value = '4'
      maskedInput.update()

      expect([
        inputElement.selectionStart,
        inputElement.selectionEnd
      ]).to.deep.equal([0, 0])
    })
  })

  it('sets the value to empty if conformed input is placeholder and caret is at 0', () => {
    const inputElement = document.createElement('input')

    const maskedInput = maskInput({
      inputElement,
      mask: '(11)',
      guide: true,
    })

    inputElement.value = '(__)'
    inputElement.selectionStart = 0

    maskedInput.update()

    inputElement.value = '__)'
    inputElement.selectionStart = 0

    maskedInput.update()

    expect(inputElement.value).to.equal('')
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
            const inputElement = document.createElement('input')

            const maskedInput = maskInput({
              inputElement,
              mask: test.input.mask,
              guide: true,
            })

            inputElement.focus()
            maskedInput.state.conformedInput = test.input.startingInputFieldValue

            if (inputElement.value.length > 0) {
              maskedInput.update()
            }

            inputElement.value = test.input.userModifiedInputFieldValue
            inputElement.selectionStart = test.input.caretPositionAfterInputFieldValueChange
            inputElement.selectionEnd = test.input.caretPositionAfterInputFieldValueChange

            inputElement.focus()
            maskedInput.update()

            expect([
              inputElement.value,
              inputElement.selectionStart,
              inputElement.selectionEnd
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
      noGuideMode,

      (test) => {
        return {
          description: JSON.stringify(test),

          body: () => {
            const inputElement = document.createElement('input')

            const maskedInput = maskInput({
              inputElement,
              mask: test.input.mask,
              guide: false,
            })

            inputElement.focus()
            maskedInput.state.conformedInput = test.input.startingInputFieldValue

            if (inputElement.value.length > 0) {
              maskedInput.update()
            }

            inputElement.value = test.input.userModifiedInputFieldValue
            inputElement.selectionStart = test.input.caretPositionAfterInputFieldValueChange
            inputElement.selectionEnd = test.input.caretPositionAfterInputFieldValueChange

            inputElement.focus()
            maskedInput.update()

            expect([
              inputElement.value,
              inputElement.selectionStart,
              inputElement.selectionEnd
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
