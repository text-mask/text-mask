import packageJson from '../package.json'

const retainCharsPositions = (isVerify()) ?
  require(`../${packageJson.main}`).retainCharsPositions :
  require('../src/retainCharsPositions.js').default

describe.only('retainCharsPositions', () => {
  it('replaces deleted characters with placeholder character', () => {
    expect(retainCharsPositions({
      valueToConform: '05/0/200',
      currentCaretPosition: 4,
      previousConformedInput: '05/05/200',
      placeholder: '__/__/____',
      placeholderChar: '_',
    })).to.equal('05/0_/200')
  })

  it('does not replace non-placeholder positions', () => {
    expect(retainCharsPositions({
      valueToConform: '05/05200',
      currentCaretPosition: 5,
      previousConformedInput: '05/05/200',
      placeholder: '__/__/____',
      placeholderChar: '_',
    })).to.equal('05/05/200')
  })

  it('works with multi-char deletions', () => {
    expect(retainCharsPositions({
      valueToConform: '05/000',
      currentCaretPosition: 4,
      previousConformedInput: '05/05/200',
      placeholder: '__/__/____',
      placeholderChar: '_',
    })).to.equal('05/0_/_00')
  })

  
})
