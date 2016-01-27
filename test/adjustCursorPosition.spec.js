import chai from 'chai'
import adjustCursorPosition from '../src/adjustCursorPosition.js'

const expect = chai.expect

describe('adjustCursorPosition', () => {
  it('only knows how to adjust the cursor position when there is one change between ' +
     'new and old inputs, otherwise it returns the current cursor position', () => {
    expect(adjustCursorPosition('3333', '2938', 1000)).to.equal(1000)
  })

  it('returns the same cursor position if new input and previous input are equal', () => {
    expect(adjustCursorPosition(
      '(___) ___-____',
      '(___) ___-____',
      5
    )).to.equal(5)

    expect(adjustCursorPosition(
      '(123) ___-____',
      '(123) ___-____',
      10
    )).to.equal(10)
  })

  it('knows to move cursor to the next pattern part when the last character of the current part ' +
     'has just been filled and the cursor is at the end of the pattern part', () => {
    expect(adjustCursorPosition('(12_) _', '(123) _', 4, '(111) 1')).to.equal(6)
    expect(adjustCursorPosition('(12_) _', '(132) _', 3, '(111) 1')).to.equal(3)
    expect(adjustCursorPosition('(12_) 7', '(132) 7', 3, '(111) 1')).to.equal(3)
  })

  it('knows to move cursor to previous pattern part when the first character of current part ' +
     'has just been deleted and the cursor is at the beginning of the pattern part', () => {
    expect(adjustCursorPosition('(124) 3', '(124) _', 6, '(111) 1')).to.equal(4)
    expect(adjustCursorPosition('(12_) 3', '(12_) _', 6, '(111) 1')).to.equal(4)
  })

  ;[
    {
      previousInput: '(___)',
      newInput: '(3__)',
      currentCursorPosition: 1,
      pattern: '(111)',
      results: 2
    },

    {
      previousInput: '___',
      newInput: '1__',
      currentCursorPosition: 1,
      pattern: '111',
      results: 1
    },

    {
      previousInput: '1__',
      newInput: '11_',
      currentCursorPosition: 2,
      pattern: '111',
      results: 2
    },

    {
      previousInput: '11_',
      newInput: '111',
      currentCursorPosition: 3,
      pattern: '111',
      results: 3
    },

    {
      previousInput: '(12_) _',
      newInput: '(12_) _',
      currentCursorPosition: 3,
      pattern: '(111) 1',
      results: 3
    },

    {
      previousInput: '(___) ___-____',
      newInput: '(1__) ___-____',
      currentCursorPosition: 1,
      pattern: '(111) 111-1111',
      results: 2
    },

    {
      previousInput: '(1__) ___-3___',
      newInput: '(1__) ___-____',
      currentCursorPosition: 10,
      pattern: '(111) 111-1111',
      results: 9
    },

    {
      previousInput: '(1__) ___-3___',
      newInput: '(12_) ___-3___',
      currentCursorPosition: 3,
      pattern: '(111) 111-1111',
      results: 3
    },

    {
      previousInput: '(333) ___-____',
      newInput: '(333) 3__-____',
      currentCursorPosition: 2,
      pattern: '(111) 111-1111',
      results: 2
    },

    {
      previousInput: '(123) 948-____',
      newInput: '(123) 94_-____',
      currentCursorPosition: 8,
      pattern: '(111) 111-1111',
      results: 8
    }
  ].map((test) => {
    //if (!test.only) { return }

    it(`for user inputs previous: '${test.previousInput}', new: '${test.newInput}', ` +
       `and pattern '${test.pattern}', it guesses the new cursor position to be ${test.results}`, () => {
      expect(adjustCursorPosition(
        test.previousInput,
        test.newInput,
        test.currentCursorPosition,
        test.pattern
      )).to.equal(test.results)
    })
  })
})
