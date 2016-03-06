import chai from 'chai'
import adjustCaretPosition from '../src/adjustCaretPosition.js'
import dynamicTests from 'mocha-dynamic-tests'
import testParameters from './testParameters.js'

const expect = chai.expect

describe('adjustCaretPosition', () => {
  it('places the caret after the last change when operation is addition', () => {
    expect(adjustCaretPosition({
      previousInput: '3333',
      conformToMaskResults: {
        output: '2938',
        mask: '1111',
        input: '2938'
      },
      currentCaretPosition: 4
    })).to.equal(4)
  })

  it('sets the caret back in order to prevent it from moving when the change ' +
     'has not actually modified the output and the operation is not deletion', () => {
    expect(adjustCaretPosition({
      previousInput: '(___) ___-____',
      conformToMaskResults: {
        input: '(___) ___-____',
        output: '(___) ___-____',
        mask: '(111) 111-1111'
      },
      currentCaretPosition: 5
    })).to.equal(4)

    expect(adjustCaretPosition({
      previousInput: '(123) ___-____',
      conformToMaskResults: {
        output: '(123) ___-____',
        input: '(123) ___-____',
        mask: '(111) 111-1111'
      },
      currentCaretPosition: 10
    })).to.equal(9)
  })

  it('knows to move the caret back when the previousInput and conformToMaskResults output ' +
     'are identical but the operation is deletion', () => {
    expect(adjustCaretPosition({
      previousInput: '(123) ___-____',
      conformToMaskResults: {
        input: '(123 ___-____',
        output: '(123) ___-____',
        mask: '(111) 111-1111'
      },
      currentCaretPosition: 4
    })).to.equal(4)
  })

  it('knows to move caret to the next mask area when the last character of the current part ' +
     'has just been filled and the caret is at the end of the mask part', () => {
    expect(adjustCaretPosition({
      previousInput: '(12_) _',
      conformToMaskResults: {
        input: '(123_) _',
        output: '(123) _',
        mask: '(111) 1',
      },
      currentCaretPosition: 4
    })).to.equal(6)

    expect(adjustCaretPosition({
      previousInput: '(12_) 7',
      conformToMaskResults: {
        input: '(132_) 7',
        output: '(132) 7',
        mask: '(111) 1'
      },
      currentCaretPosition: 3
    })).to.equal(3)
  })

  it('knows to move caret to previous mask part when the first character of current part ' +
     'has just been deleted and the caret is at the beginning of the mask part', () => {
    expect(adjustCaretPosition({
      previousInput: '(124) 3',
      conformToMaskResults: {
        input: '(124) ',
        output: '(124) _',
        mask: '(111) 1'
      },
      currentCaretPosition: 6
    })).to.equal(4)

    expect(adjustCaretPosition({
      previousInput: '(12_) 3',
      conformToMaskResults: {
        output: '(12_) _',
        mask: '(111) 1'
      },
      currentCaretPosition: 6
    })).to.equal(4)
  })

  dynamicTests(testParameters, (test) => ({
    description: `works for input: ${JSON.stringify(test.input)} and output: ${JSON.stringify(test.output)}`,
    body: () => {
      expect(adjustCaretPosition({
        previousInput: test.input.startingInputFieldValue,
        conformToMaskResults: {
          input: test.input.userModifiedInputFieldValue,
          output: test.output.conformedInputFieldValue,
          mask: test.input.mask
        },
        currentCaretPosition: test.input.caretPositionAfterInputFieldValueChange,
      })).to.equal(test.output.adjustedCaretPosition)
    }
  })
  //}),
  //  {only: true}
  )
})
