import chai from 'chai'
import adjustCaretPosition from '../src/adjustCaretPosition.js'
import dynamicTests from 'mocha-dynamic-tests'

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
        output: '(123) _',
        input: '(123_) _',
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

    //expect(adjustCaretPosition({
    //  previousInput: '(12_) 3',
    //  conformToMaskResults: {
    //    output: '(12_) _',
    //    mask: '(111) 1'
    //  },
    //  currentCaretPosition: 6
    //})).to.equal(4)
  })

  dynamicTests([
    {
      previousInput: '(___)',
      conformToMaskResults: {
        input: '(3___)',
        output: '(3__)',
        mask: '(111)',
      },
      currentCaretPosition: 2,
      expected: 2
    },

    {
      previousInput: '___',
      conformToMaskResults: {
        input: '1___',
        output: '1__',
        mask: '111',
      },
      currentCaretPosition: 1,
      expected: 1
    },

    {
      previousInput: '1__',
      conformToMaskResults: {
        input: '11__',
        output: '11_',
        mask: '111',
      },
      currentCaretPosition: 2,
      expected: 2
    },

    {
      previousInput: '11_',
      conformToMaskResults: {
        input: '111_',
        output: '111',
        mask: '111',
      },
      currentCaretPosition: 3,
      expected: 3
    },

    {
      previousInput: '(12_) _',
      conformToMaskResults: {
        input: '(12f_) _',
        output: '(12_) _',
        mask: '(111) 1',
      },
      currentCaretPosition: 3,
      expected: 2
    },

    {
      previousInput: '(___) ___-____',
      conformToMaskResults: {
        input: '(1___) ___-____',
        output: '(1__) ___-____',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 2,
      expected: 2
    },

    {
      previousInput: '(1__) ___-3___',
      conformToMaskResults: {
        input: '(1__) ___-___',
        output: '(1__) ___-____',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 10,
      expected: 9
    },

    {
      previousInput: '(1__) ___-3___',
      conformToMaskResults: {
        input: '(12__) ___-3___',
        output: '(12_) ___-3___',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 3,
      expected: 3
    },

    {
      previousInput: '(333) ___-____',
      conformToMaskResults: {
        input: '(3333) ___-____',
        output: '(333) 3__-____',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 2,
      expected: 2,
      //only: true
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
      conformToMaskResults: {
        output: '(__4) 44_-____',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 7,
      expected: 7,
      skip: true,
    },

    // TODO: fix this test case. It currently results in 10!!!
    {
      previousInput: '(__4) 44_-____',
      conformToMaskResults: {
        output: '(__4) 444-____',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 8,
      expected: 8,
      skip: true
    },

    {
      previousInput: '(__4) 444-____',
      conformToMaskResults: {
        input: '(__4) 444-___',
        output: '(__4) 444-____',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 10,
      expected: 10,
    },

    {
      previousInput: '(__4) 444-____',
      conformToMaskResults: {
        input: '(__4) 444____',
        output: '(__4) 444-____',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 9,
      expected: 9,
    },

    {
      previousInput: '(__4) 444-____',
      conformToMaskResults: {
        input: '(__4) 44-____',
        output: '(__4) 44_-____',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 8,
      expected: 8,
    },

    {
      previousInput: '(___) ___-____',
      conformToMaskResults: {
        input: '(__4_) ___-____',
        output: '(__4) ___-____',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 4,
      expected: 6,
    },

    {
      previousInput: '(505) ___-____',
      conformToMaskResults: {
        input: '(505 ___-____',
        output: '(505) ___-____',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 4,
      expected: 4,
    },

    {
      previousInput: '(505) ___-____',
      conformToMaskResults: {
        input: '(505) __-____',
        output: '(505) ___-____',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 6,
      expected: 6,
    },

    {
      previousInput: '(333) 333-3___',
      conformToMaskResults: {
        input: '(33) 333-3___',
        output: '(333) 333-____',
        mask: '(111) 111-1111'
      },
      currentCaretPosition: 3,
      expected: 3,
    },

    {
      previousInput: '(___) ___-____',
      conformToMaskResults: {
        output: '(5__) ___-____',
        input: '5',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 1,
      expected: 2,
    },

    {
      previousInput: '(000) ___-____',
      conformToMaskResults: {
        input: '(00) ___-____',
        output: '(00_) ___-____',
        mask: '(111) 111-1111',
      },
      currentCaretPosition: 2,
      expected: 2,
    },

    {
      previousInput: '44/__',
      conformToMaskResults: {
        input: '4/__',
        output: '4_/__',
        mask: '11/11',
      },
      currentCaretPosition: 1,
      expected: 1,
    },

    {
      previousInput: '(124) 3',
      conformToMaskResults: {
        input: '(124) ',
        output: '(124) _',
        mask: '(111) 1'
      },
      currentCaretPosition: 6,
      expected: 4,
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
