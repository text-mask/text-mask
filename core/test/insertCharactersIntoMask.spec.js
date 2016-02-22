import insertCharactersIntoMask from '../src/insertCharactersIntoMask.js'
import chai from 'chai'
import dynamicTests from 'mocha-dynamic-tests'

const expect = chai.expect

describe('insertCharactersIntoMask', () => {
  it('returns a string', () => {
    expect(
      insertCharactersIntoMask()
    ).to.be.a('string')
  })

  dynamicTests([{
    parameters: {
      characterPositions: [{character: '2', position: 0, area: 1}],
      mask: '11/11',
    },
    expected: '__/2_',
  }, {
    parameters: {
      characterPositions: [{character: 'a', position: 0, area: 1}],
      mask: '11/11'
    },
    expected: '__/__',
  }, {
    parameters: {
      characterPositions: [{character: '-', position: 0, area: 1}],
      mask: '11-11'
    },
    expected: '__-__',
  }], (test) => ({
    description: `knows for characterPositions: ${JSON.stringify(test.parameters.characterPositions)} and mask ` +
    `${test.parameters.mask} to return ${JSON.stringify(test.expected)}`,
    body: () => {
      expect(insertCharactersIntoMask(
        test.parameters.characterPositions,
        test.parameters.mask
      )).to.deep.equal(test.expected)
    }
  }))
})
