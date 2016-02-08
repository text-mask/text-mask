import getPatternAreaLengths from '../../stringPattern/src/getPatternAreaLengths.js'
import chai from 'chai'

const expect = chai.expect

describe('getPatternAreaLengths', () => {
  it('returns an array', () => {
    expect(
      getPatternAreaLengths()
    ).to.be.an('array')
  })

  ;[
    {input: {pattern: '11/11'}, output: [2, 2]},
    {input: {pattern: '(111) 111-1111'}, output: [3, 3, 4]}
  ].map((test) => {
    it(`for pattern: ${test.input.pattern} it determines the area lengths to be ` +
       `${JSON.stringify(test.output)}`, () => {
      expect(getPatternAreaLengths(test.input.pattern)).to.deep.equal(test.output)
    })
  })
})
