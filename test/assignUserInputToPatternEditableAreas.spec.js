import chai from 'chai'
import assignUserInputToPatternEditableAreas from
  '../src/assignUserInputToPatternEditableAreas.js'
import getPatternEditableAreas from '../src/getPatternEditableAreas.js'
import chunkUserInput from '../src/chunkUserInput.js'
const expect = chai.expect

describe('assignUserInputToPatternEditableAreas', () => {
  it('returns an array', () => {
    expect(
      assignUserInputToPatternEditableAreas()
    ).to.be.an('array')
  })

  it('takes two objects: pattern editable areas and user input chunks', () => {
    const pattern = '11/11/1111'

    expect(() => assignUserInputToPatternEditableAreas(
      getPatternEditableAreas(pattern),
      chunkUserInput('11/11', pattern)
    )).to.not.throw()
  })

  it('inserts user content into pattern editable areas', () => {
    const pattern = '11/11/1111'

    expect(assignUserInputToPatternEditableAreas(
      getPatternEditableAreas(pattern),
      chunkUserInput('11/11', pattern)
    )).to.deep.equal([
      {length: 2, delimiter: '/', content: '11'},
      {length: 2, delimiter: '/', content: '11'},
      {length: 4, delimiter: '', content: ''}
    ])
  })

  it('knows how to merge (747)474-4747 into (111) 111-1111', () => {
    const pattern = '(111) 111-1111'

    expect(assignUserInputToPatternEditableAreas(
      getPatternEditableAreas(pattern),
      chunkUserInput('(747)474-4747', pattern)
    )).to.deep.equal([
      {length: 0, delimiter: '(', content: ''},
      {length: 3, delimiter: ')', content: '747'},
      {length: 0, delimiter: ' ', content: ''},
      {length: 3, delimiter: '-', content: '474'},
      {length: 4, delimiter: '', content: '4747'}
    ])
  })
})
