import getMaskAreaLengths from '../src/getMaskAreaLengths.js'
import chai from 'chai'
import dynamicTests from 'mocha-dynamic-tests'

const expect = chai.expect

describe('getMaskAreaLengths', () => {
  it('returns an array', () => {
    expect(
      getMaskAreaLengths()
    ).to.be.an('array')
  })

  dynamicTests([
    {input: {mask: '11/11'}, output: [2, 2]},
    {input: {mask: '(111) 111-1111'}, output: [3, 3, 4]}
  ], (test) => ({
    description: `for mask: ${test.input.mask} it determines the area lengths to be ` +
      `${JSON.stringify(test.output)}`,
    body: () => {
      expect(getMaskAreaLengths(test.input.mask)).to.deep.equal(test.output)
    }
  }))
})
