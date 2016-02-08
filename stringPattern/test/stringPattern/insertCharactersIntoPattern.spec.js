import insertCharactersIntoPattern from '../../stringPattern/src/insertCharactersIntoPattern.js'
import chai from 'chai'

const expect = chai.expect

describe('insertCharactersIntoPattern', () => {
  it('returns a string', () => {
    expect(
      insertCharactersIntoPattern()
    ).to.be.a('string')
  })

  ;[
    {input: {
      characterPosition: [{character: '2', position: 0, area: 1}],
      pattern: '11/11',
    }, output: '__/2_'},

  ].map((test) => {
    it(`knows for characterPosition: ${JSON.stringify(test.input.characterPosition)} and pattern ` +
       `${test.input.pattern} to return ${test.output}`, () => {
      expect(insertCharactersIntoPattern(
        test.input.characterPosition,
        test.input.pattern
      )).to.equal(test.output)
    })
  })
})
