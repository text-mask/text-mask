import chai from 'chai'
import getPatternEditableAreas from '../src/getPatternEditableAreas.js'
import {convertPatternToPlaceholder} from '../src/utilities.js'

const expect = chai.expect

describe('getPatternEditableAreas', () => {
  it('returns an array of editable areas', () => {
    expect(getPatternEditableAreas()).to.be.an('array')
  })

  it('takes a placeholder', () => {
    expect(() => getPatternEditableAreas(convertPatternToPlaceholder('11/11'))).to.not.throw()
  })

  it('returns the number of editable areas in a placeholder', () => {
    expect(getPatternEditableAreas('__/__').length).to.equal(2)
  })

  it('returns an array of 3 for __/__/____', () => {
    expect(getPatternEditableAreas('__/__/____').length).to.equal(3)
  })

  it('tells us the length of each editable area', () => {
    const editableAreas = getPatternEditableAreas('__/__/____')

    expect(editableAreas[0].length).to.equal(2)
    expect(editableAreas[1].length).to.equal(2)
    expect(editableAreas[2].length).to.equal(4)
  })

  it('tells us what character delimits the editable area', () => {
    const editableAreas = getPatternEditableAreas('__/__|____')

    expect(editableAreas[0].delimiter).to.equal('/')
    expect(editableAreas[1].delimiter).to.equal('|')
    expect(editableAreas[2].delimiter).to.equal(undefined)
  })

  it('knows how to process pattern `(111) 111-1111`', () => {
    const editableAreas = getPatternEditableAreas('(111) 111-1111')

    expect(editableAreas).to.deep.equal([
      {length: 0, delimiter: '('},
      {length: 3, delimiter: ')'},
      {length: 0, delimiter: ' '},
      {length: 3, delimiter: '-'},
      {length: 4, delimiter: undefined}
    ])
  })
})
