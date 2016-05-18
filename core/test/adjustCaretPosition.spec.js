import packageJson from '../package.json'
import isVerify from '../../common/isVerify.js'
import chai from 'chai'
import dynamicTests from 'mocha-dynamic-tests'
import testParameters, {noGuideMode} from './../../common/testParameters.js'
import _ from 'lodash'

const adjustCaretPosition = (isVerify()) ?
  require(`../${packageJson.main}`).adjustCaretPosition :
  require('../src/adjustCaretPosition.js').default

const expect = chai.expect

describe('adjustCaretPosition', () => {
  it('places the caret after the last change when operation is addition', () => {
    expect(adjustCaretPosition({
      previousConformedInput: '3333',
      conformToMaskResults: {
        output: '2938',
        meta: {
          mask: '1111',
          input: '2938'
        }
      },
      currentCaretPosition: 4
    })).to.equal(4)
  })

  it('sets the caret back in order to prevent it from moving when the change ' +
     'has not actually modified the output and the operation is not deletion', () => {
    expect(adjustCaretPosition({
      previousConformedInput: '(123) ___-____',
      conformToMaskResults: {
        output: '(123) ___-____',
        meta: {
          input: '(123) ___-f____',
          mask: '(111) 111-1111'
        }
      },
      currentCaretPosition: 11
    })).to.equal(10)
  })

  it('moves the caret to the nearest placeholder character if the previous input and new ' +
     'conformed output are the same but the reverted position is not a ' +
     'placeholder character', () => {
    expect(adjustCaretPosition({
      previousConformedInput: '(___)      ___-____',
      conformToMaskResults: {
        output: '(___)      ___-____',
        meta: {
          input: '(___))      ___-____',
          mask: '(111)      111-1111'
        }
      },
      currentCaretPosition: 5
    })).to.equal(11)
  })

  it('knows to move the caret back when the previousInput and conformToMaskResults output ' +
     'are identical but the operation is deletion', () => {
    expect(adjustCaretPosition({
      previousConformedInput: '(123) ___-____',
      conformToMaskResults: {
        output: '(123) ___-____',
        meta: {
          input: '(123 ___-____',
          mask: '(111) 111-1111'
        }
      },
      currentCaretPosition: 4
    })).to.equal(4)
  })

  it('knows to move caret to the next mask area when the last character of the current part ' +
     'has just been filled and the caret is at the end of the mask part', () => {
    expect(adjustCaretPosition({
      previousConformedInput: '(12_) _',
      conformToMaskResults: {
        output: '(123) _',
        meta: {
          input: '(123_) _',
          mask: '(111) 1',
        }
      },
      currentCaretPosition: 4
    })).to.equal(6)

    expect(adjustCaretPosition({
      previousConformedInput: '(12_) 7',
      conformToMaskResults: {
        output: '(132) _',
        meta: {
          input: '(132_) 7',
          mask: '(111) 1'
        }
      },
      currentCaretPosition: 3
    })).to.equal(3)
  })

  it('knows to move caret to previous mask part when the first character of current part ' +
     'has just been deleted and the caret is at the beginning of the mask part', () => {
    expect(adjustCaretPosition({
      previousConformedInput: '(124) 3',
      conformToMaskResults: {
        output: '(124) _',
        meta: {
          input: '(124) ',
          mask: '(111) 1'
        }
      },
      currentCaretPosition: 6
    })).to.equal(4)

    expect(adjustCaretPosition({
      previousConformedInput: '(12_) 3',
      conformToMaskResults: {
        output: '(12_) _',
        meta: {
          input: '(12_) ',
          mask: '(111) 1'
        }
      },
      currentCaretPosition: 6
    })).to.equal(4)
  })

  dynamicTests(
    _.filter(testParameters, (testParameter) => {
      return !(_.isArray(testParameter.skips) && _.includes(testParameter.skips, 'adjustCaretPosition'))
    }),

    (test) => ({
      description: `for input: ${
        JSON.stringify(test.input)
        } and conformToMaskResults: ${JSON.stringify({
          input: test.input.userModifiedInputFieldValue,
          output: test.output.conformedInputFieldValue,
          mask: test.input.mask
        })}, it knows to adjust the caret to '${
        test.output.adjustedCaretPosition
      }'`,

      body: () => {
        expect(adjustCaretPosition({
          previousConformedInput: test.input.startingInputFieldValue,
          conformToMaskResults: {
            output: test.output.conformedInputFieldValue,
            meta: {
              input: test.input.userModifiedInputFieldValue,
              mask: test.input.mask,
              guide: true,
              containsRejectedCharacter: test.input.containsRejectedCharacter
            }
          },
          currentCaretPosition: test.input.caretPositionAfterInputFieldValueChange,
        })).to.equal(test.output.adjustedCaretPosition)
      }
    })
  )

  dynamicTests(
    _.filter(noGuideMode, (testParameter) => {
      return !(_.isArray(testParameter.skips) && _.includes(testParameter.skips, 'adjustCaretPosition'))
    }),

    (test) => ({
      description: `for input: ${
        JSON.stringify(test.input)
        } and conformToMaskResults: ${JSON.stringify({
          input: test.input.userModifiedInputFieldValue,
          output: test.output.conformedInputFieldValue,
          mask: test.input.mask
        })}, it knows to adjust the caret to '${
        test.output.adjustedCaretPosition
      }'`,

      body: () => {
        expect(adjustCaretPosition({
          previousConformedInput: test.input.startingInputFieldValue,
          conformToMaskResults: {
            output: test.output.conformedInputFieldValue,
            meta: {
              input: test.input.userModifiedInputFieldValue,
              mask: test.input.mask,
              guide: false,
              containsRejectedCharacter: test.input.containsRejectedCharacter
            }
          },
          currentCaretPosition: test.input.caretPositionAfterInputFieldValueChange,
        })).to.equal(test.output.adjustedCaretPosition)
      }
    })
  )
})
