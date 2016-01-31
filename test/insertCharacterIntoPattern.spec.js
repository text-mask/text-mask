import insertCharacterIntoPattern from '../src/insertCharacterIntoPattern.js'
import chai from 'chai'

const expect = chai.expect

describe('insertCharacterIntoPattern', () => {
  it('returns a string', () => {
    expect(
      insertCharacterIntoPattern()
    ).to.be.a('string')
  })

  ;[
    {input: {
      characterPosition: {character: '2', position: 0, area: 0},
      pattern: '11/11',
      userInput: '__/__'
    }, output: '__/2_'},

  ].map((test) => {
    it(`knows for characterPosition: ${test.input.characterPosition} and pattern ` +
       `${test.input.pattern} to return ${test.output}`, () => {
      expect(insertCharacterIntoPattern(
        test.input.characterPosition,
        test.input.pattern
      )).to.equal(test.output)
    })
  })
})
