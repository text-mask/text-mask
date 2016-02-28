import {diffChars} from 'diff'
import chai from 'chai'
import {
  getIndexOfLastAddedCharacter,
  getIndexOfFirstRemovedCharacter
} from '../src/getDiffIndexes.js'
import dynamicTests from 'mocha-dynamic-tests'

const expect = chai.expect

describe('getDiffIndexes', () => {
  describe('getIndexOfLastAddedCharacter', () => {
    dynamicTests([{
      input: {
        original: '(___)',
        current: '(3__)',
      },
      expected: 1,
      //only: true
    }, {
      input: {
        original: '___',
        current: '1__',
      },
      expected: 0
    }, {
      input: {
        original: '1__',
        current: '11_',
      },
      expected: 1,
      //only: true
    }, {
      input: {
        original: '(12_) 7',
        current: '(132) 7',
      },
      expected: 2,
      //only: true
    }, {
      input: {
        original: '(___) ___/____',
        current: '(5__) ___/____',
      },
      expected: 1,
      //only: true
    }, {
      input: {
        original: '3333',
        current: '2938',
      },
      expected: 3,
      //only: true
    }], (test) => ({
      description: `for input original: '${test.input.original}' and current: '${test.input.current}' ` +
      `it returns ${test.expected}`,
      body: () => {
        expect(getIndexOfLastAddedCharacter(
          test.input.original,
          test.input.current
        )).to.equal(test.expected)
      }
    })
    //}),
    //  {only: true}
    )
  })

  describe('getIndexOfFirstRemovedCharacter', () => {
    dynamicTests([{
        input: {
          original: '(132) 7',
          current: '(12_) 7',
        },
        expected: 2,
      }], (test) => ({
        description: `for input original: '${test.input.original}' and current: '${test.input.current}' ` +
         `it returns ${test.expected}`,
        body: () => {
          expect(getIndexOfFirstRemovedCharacter(
            test.input.original,
            test.input.current
          )).to.equal(test.expected)
        }
      })
      //}),
      //  {only: true}
    )
  })
})
