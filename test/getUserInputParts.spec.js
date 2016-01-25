import chai from 'chai'
import getUserInputParts from '../src/getUserInputParts.js'
import {convertPatternToPlaceholder} from '../src/utilities.js'

const expect = chai.expect

describe.only('getUserInputParts', () => {
  it('returns an array of user input chunks', () => {
    expect(getUserInputParts()).to.be.an('array')
  })

  it('takes two strings, userInput and a pattern', () => {
    expect(() => getUserInputParts('12/32', '11/11')).to.not.throw()
  })

  it('breaks user input into chunks that match given pattern', () => {
    expect(getUserInputParts('11', '11/11')).to.deep.equal(['11'])
  })

  ;[
    {input: '84/734', pattern: '11/111', output: ['84', '734']},
    {input: '(787) 787-7878', pattern: '(111) 111-1111', output: ['787', '787', '7878']},
    {input: '(787)787-7878', pattern: '(111) 111-1111', output: ['787', '787', '7878']}
  ].map((test) => {
    it(`returns ${JSON.stringify(test.output)} for input ${test.input} and pattern ` +
       `${test.pattern}`, () => {
      expect(getUserInputParts(test.input, test.pattern)).to.deep.equal(test.output)
    })
  })
})
