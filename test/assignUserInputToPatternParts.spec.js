import chai from 'chai'
import assignUserInputToPatternParts from
  '../src/assignUserInputToPatternParts.js'
import getPatternParts from '../src/getPatternParts.js'
import getUserInputParts from '../src/getUserInputParts.js'

const expect = chai.expect

describe.only('assignUserInputToPatternParts', () => {
  //it('returns an array', () => {
  //  expect(
  //    assignUserInputToPatternParts()
  //  ).to.be.an('array')
  //})
  //
  //it('takes two objects: pattern parts and user input parts', () => {
  //  const pattern = '11/11/1111'
  //
  //  expect(() => assignUserInputToPatternParts(
  //    getPatternParts(pattern),
  //    getUserInputParts('11/11', pattern)
  //  )).to.not.throw()
  //})

  ;[
    {
      input: '1', pattern: '(', output: [
        {length: 0, delimiter: '(', content: ''}
      ]
    },

    {
      input: '2', pattern: '1', output: [
        {length: 1, delimiter: '', content: '2'}
      ]
    },

    {
      input: '__/22', pattern: '11/11', output: [
        {length: 2, delimiter: '/', content: '__'},
        {length: 2, delimiter: '', content: '22'}
      ]
    },

    {
      input: '2__/22', pattern: '11/11', output: [
        {length: 2, delimiter: '/', content: '2_'},
        {length: 2, delimiter: '', content: '22'}
      ]
    },

    {
      input: '22', pattern: '11/11', output: [
        {length: 2, delimiter: '/', content: '22'},
        {length: 2, delimiter: '', content: '__'}
      ]
    },

    {
      input: '222', pattern: '11/11', output: [
        {length: 2, delimiter: '/', content: '22'},
        {length: 2, delimiter: '', content: '2_'}
      ]
    },

    {
      input: '777777', pattern: '11/11', output: [
        {length: 2, delimiter: '/', content: '77'},
        {length: 2, delimiter: '', content: '77'}
      ]
    },

    {
      input: '222/1', pattern: '11/11', output: [
        {length: 2, delimiter: '/', content: '22'},
        {length: 2, delimiter: '', content: '21'}
      ]
    },

    {
      input: '8_/4_2/222_1', pattern: '11/11/1111', output: [
        {length: 2, delimiter: '/', content: '8_'},
        {length: 2, delimiter: '/', content: '42'},
        {length: 4, delimiter: '', content: '2221'}
      ]
    },

    {
      input: '8293847/4_2/222_1', pattern: '11/11/1111', output: [
        {length: 2, delimiter: '/', content: '82'},
        {length: 2, delimiter: '/', content: '93'},
        {length: 4, delimiter: '', content: '8474'}
      ]
    }

    //{
    //  userInput: '__/11', pattern: '11/11', output: [
    //    {length: 2, delimiter: '/', content: ''},
    //    {length: 2, delimiter: '', content: '11'}
    //  ]
    //}
  ].map((test) => {
    //if (!test.only) { return }

    it(`returns ${JSON.stringify(test.output)} for input '${test.input}' and ` +
       `pattern '${test.pattern}'`, () => {
      expect(assignUserInputToPatternParts(
        getPatternParts(test.pattern),
        getUserInputParts(test.input, test.pattern))
      ).to.deep.equal(test.output)
    })
  })
})
