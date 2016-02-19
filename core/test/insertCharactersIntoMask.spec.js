import insertCharactersIntoMask from '../src/insertCharactersIntoMask.js'
import chai from 'chai'
import dynamicTests from 'mocha-dynamic-tests'

const expect = chai.expect

describe('insertCharactersIntoMask', () => {
  it('returns an object', () => {
    expect(
      insertCharactersIntoMask()
    ).to.be.an('object')
  })

  dynamicTests([{
    parameters: {
      characterPositions: [{character: '2', position: 0, area: 1}],
      mask: '11/11',
    },
    expected: {
      output: '__/2_',
      mask: '11/11',
      rejectedCharacterIndex: null
    },
  }, {
    parameters: {
      characterPositions: [{character: 'a', position: 0, area: 1}],
      mask: '11/11'
    },
    expected: {
      output: '__/__',
      mask: '11/11',
      rejectedCharacterIndex: 3
    },
  }, {
    parameters: {
      characterPositions: [{character: '-', position: 0, area: 1}],
      mask: '11-11'
    },
    expected: {
      output: '__-__',
      mask: '11-11',
      rejectedCharacterIndex: 3
    },
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
