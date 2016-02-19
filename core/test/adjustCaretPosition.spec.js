import chai from 'chai'
import adjustCaretPosition from '../src/adjustCaretPosition.js'
import dynamicTests from 'mocha-dynamic-tests'

const expect = chai.expect

describe('adjustCaretPosition', () => {
  it('only knows how to adjust the caret position when there is one change between ' +
     'new and old inputs, otherwise it returns the current caret position', () => {
    expect(adjustCaretPosition({
      previousInput: '3333',
      conformToMaskResults: {
        output: '2938',
        mask: '1111'
      },
      currentCaretPosition: 1000
    })).to.equal(1000)
  })

  it('sets the caret back in order to prevent it from moving when the change ' +
     'has not actually modified the output', () => {
    expect(adjustCaretPosition({
      previousInput: '(___) ___-____',
      conformToMaskResults: {
        output: '(___) ___-____',
        mask: '(111) 111-1111'
      },
      currentCaretPosition: 5
    })).to.equal(4)

    expect(adjustCaretPosition({
      previousInput: '(123) ___-____',
      conformToMaskResults: {
        output: '(123) ___-____',
        mask: '(111) 111-1111'
      },
      currentCaretPosition: 10
    })).to.equal(9)
  })

  it('knows to move caret to the next mask area when the last character of the current part ' +
     'has just been filled and the caret is at the end of the mask part', () => {
    expect(adjustCaretPosition({
      previousInput: '(12_) _',
      conformToMaskResults: {
        output: '(123) _',
        mask: '(111) 1',
      },
      currentCaretPosition: 4
    })).to.equal(6)

    expect(adjustCaretPosition({
      previousInput: '(12_) _',
      conformToMaskResults: {
        output: '(132) _',
        mask: '(111) 1'
      },
      currentCaretPosition: 3
    }))

    expect(adjustCaretPosition({
      previousInput: '(12_) 7',
      conformToMaskResults: {
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

  dynamicTests([
    {
      previousInput: '(___)',
      conformToMaskResults: {
        output: '(3__)',
        mask: '(111)',
      },
      currentCaretPosition: 1,
      expected: 2
    },

    {
      previousInput: '___',
      conformToMaskResults: {
        output: '1__',
        mask: '111',
      },
      currentCaretPosition: 1,
      expected: 1
    },

    {
      previousInput: '1__',
      conformToMaskResults: {
        output: '11_',
        mask: '111',
      },
      currentCaretPosition: 2,
      expected: 2
    },

    {
      previousInput: '11_',
      conformToMaskResults: {
        output: '111',
        mask: '111',
      },
      currentCaretPosition: 3,
      expected: 3
    },

    {
      previousInput: '(12_) _',
      conformToMaskResults: {
        output: '(12_) _',
        mask: '(111) 1',
      },
      currentCaretPosition: 3,
      expected: 2
    },

    {
      previousInput: '(___) ___-____',
      conformToMaskResults: {
        output: '(1__) ___-____',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 1,
      expected: 2
    },

    {
      previousInput: '(1__) ___-3___',
      conformToMaskResults: {
        output: '(1__) ___-____',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 10,
      expected: 9
    },

    {
      previousInput: '(1__) ___-3___',
      conformToMaskResults: {
        output: '(12_) ___-3___',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 3,
      expected: 3
    },

    {
      previousInput: '(333) ___-____',
      conformToMaskResults: {
        output: '(333) 3__-____',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 2,
      expected: 2
    },

    {
      previousInput: '(123) 948-____',
      conformToMaskResults: {
        output: '(123) 94_-____',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 8,
      expected: 8,
    },

    // TODO: fix this test case. It currently results in 8!!!
    {
      previousInput: '(__4) 444-____',
      newInput: '(__4) 44_-____',
      currentCaretPosition: 7,
      mask: '(111) 111-1111',
      expected: 7,
      skip: true
    },

    {
      previousInput: '(__4) 444-___',
      currentCaretPosition: 10,
      conformToMaskResults: {
        output: '(__4) 444-____',
        mask: '(111) 111-1111',
      },
      expected: 10
    }
  ], (test) => ({
    description: `for previousInput: '${test.previousInput}', currentCaretPosition: '${test.currentCaretPosition}' ` +
      `and conformToMaskResults: '${JSON.stringify(test.conformToMaskResults)}', it guesses the new caret ` +
      `position to be ${test.expected}`,
    body: () => {
      expect(adjustCaretPosition({
        previousInput: test.previousInput,
        conformToMaskResults: test.conformToMaskResults,
        currentCaretPosition: test.currentCaretPosition,
      })).to.equal(test.expected)
    }
  }))
})
