import chai from 'chai'
import adjustCaretPosition from '../../stringPattern/src/adjustCaretPosition.js'

const expect = chai.expect

describe('adjustCaretPosition', () => {
  it('only knows how to adjust the caret position when there is one change between ' +
     'new and old inputs, otherwise it returns the current caret position', () => {
    expect(adjustCaretPosition('3333', '2938', 1000)).to.equal(1000)
  })

  it('returns the same caret position if new input and previous input are equal', () => {
    expect(adjustCaretPosition(
      '(___) ___-____',
      '(___) ___-____',
      5
    )).to.equal(5)

    expect(adjustCaretPosition(
      '(123) ___-____',
      '(123) ___-____',
      10
    )).to.equal(10)
  })

  it('knows to move caret to the next pattern part when the last character of the current part ' +
     'has just been filled and the caret is at the end of the pattern part', () => {
    expect(adjustCaretPosition('(12_) _', '(123) _', 4, '(111) 1')).to.equal(6)
    expect(adjustCaretPosition('(12_) _', '(132) _', 3, '(111) 1')).to.equal(3)
    expect(adjustCaretPosition('(12_) 7', '(132) 7', 3, '(111) 1')).to.equal(3)
  })

  it('knows to move caret to previous pattern part when the first character of current part ' +
     'has just been deleted and the caret is at the beginning of the pattern part', () => {
    expect(adjustCaretPosition('(124) 3', '(124) _', 6, '(111) 1')).to.equal(4)
    expect(adjustCaretPosition('(12_) 3', '(12_) _', 6, '(111) 1')).to.equal(4)
  })

  ;[
    {
      previousInput: '(___)',
      newInput: '(3__)',
      currentCaretPosition: 1,
      pattern: '(111)',
      results: 2
    },

    {
      previousInput: '___',
      newInput: '1__',
      currentCaretPosition: 1,
      pattern: '111',
      results: 1
    },

    {
      previousInput: '1__',
      newInput: '11_',
      currentCaretPosition: 2,
      pattern: '111',
      results: 2
    },

    {
      previousInput: '11_',
      newInput: '111',
      currentCaretPosition: 3,
      pattern: '111',
      results: 3
    },

    {
      previousInput: '(12_) _',
      newInput: '(12_) _',
      currentCaretPosition: 3,
      pattern: '(111) 1',
      results: 3
    },

    {
      previousInput: '(___) ___-____',
      newInput: '(1__) ___-____',
      currentCaretPosition: 1,
      pattern: '(111) 111-1111',
      results: 2
    },

    {
      previousInput: '(1__) ___-3___',
      newInput: '(1__) ___-____',
      currentCaretPosition: 10,
      pattern: '(111) 111-1111',
      results: 9
    },

    {
      previousInput: '(1__) ___-3___',
      newInput: '(12_) ___-3___',
      currentCaretPosition: 3,
      pattern: '(111) 111-1111',
      results: 3
    },

    {
      previousInput: '(333) ___-____',
      newInput: '(333) 3__-____',
      currentCaretPosition: 2,
      pattern: '(111) 111-1111',
      results: 2
    },

    {
      previousInput: '(123) 948-____',
      newInput: '(123) 94_-____',
      currentCaretPosition: 8,
      pattern: '(111) 111-1111',
      results: 8
    },

    // TODO: fix this test case. It currently results in 8!!!
    //{
    //  previousInput: '(__4) 444-____',
    //  newInput: '(__4) 44_-____',
    //  currentCaretPosition: 7,
    //  pattern: '(111) 111-1111',
    //  results: 7
    //}
  ].map((test) => {
    //if (!test.only) { return }

    it(`for user inputs previous: '${test.previousInput}', new: '${test.newInput}', ` +
       `and pattern '${test.pattern}', it guesses the new caret position to be ` +
       `${test.results}`, () => {
      expect(adjustCaretPosition(
        test.previousInput,
        test.newInput,
        test.currentCaretPosition,
        test.pattern
      )).to.equal(test.results)
    })
  })
})
