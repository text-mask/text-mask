import analyzeValue from '../src/analyzeValue.js'
import chai from 'chai'

const expect = chai.expect

describe('analyzeValue', () => {
  it('takes a current mask value, previous value, and a pattern and returns an array ' +
    'with analysis of every character in the value', () => {
    expect(analyzeValue('1_/__/____', '__/__/____', '11/11/1111')).to.be.an('array')
  })

  it('returns an object that has as many keys as the number of characters in the ' +
    'value string', () => {
    expect(analyzeValue('_', '__/__/____', '11/11/1111').length).to.equal(1)
  })

  it('tells us if a character is newly added', () => {
    const valueAnalysis = analyzeValue('1__/__/____', '__/__/____', '11/11/1111')

    expect(valueAnalysis[0]).to.have.property('newCharacter').and.to.equal(true)
    expect(valueAnalysis[0]).to.have.property('partOfPlaceholder').and.to.equal(false)
  })

  it('tells us if a character is part of a placeholder', () => {
    const valueAnalysis = analyzeValue('1__/__/____', '__/__/____', '11/11/1111')

    expect(valueAnalysis[1]).to.have.property('newCharacter').and.to.equal(false)
    expect(valueAnalysis[1]).to.have.property('partOfPlaceholder').and.to.equal(true)
  })

  it('tells us if a character is part of the pattern', () => {
    const valueAnalysis = analyzeValue('/__/__/____', '__/__/____', '11/11/1111')

    expect(valueAnalysis[0]).to.have.property('partOfPattern').and.to.equal(false)
  })
})
