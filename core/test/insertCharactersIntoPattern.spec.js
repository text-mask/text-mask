import insertCharactersIntoMask from '../src/insertCharactersIntoMask.js'
import chai from 'chai'

const expect = chai.expect

describe('insertCharactersIntoMask', () => {
  it('returns a string', () => {
    expect(
      insertCharactersIntoMask()
    ).to.be.a('string')
  })

  ;[
    {input: {
      characterPosition: [{character: '2', position: 0, area: 1}],
      mask: '11/11',
    }, output: '__/2_'},

  ].map((test) => {
    it(`knows for characterPosition: ${JSON.stringify(test.input.characterPosition)} and mask ` +
       `${test.input.mask} to return ${test.output}`, () => {
      expect(insertCharactersIntoMask(
        test.input.characterPosition,
        test.input.mask
      )).to.equal(test.output)
    })
  })
})
