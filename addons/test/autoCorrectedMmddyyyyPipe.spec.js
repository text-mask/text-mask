const autoCorrectedMmddyyyyPipe = (isVerify()) ?
  require('../dist/autoCorrectedMmddyyyyPipe.js').default :
  require('../src/autoCorrectedMmddyyyyPipe.js').default

describe('autoCorrectedMmddyyyyPipe', () => {
  it('completes the month if the 1st digit is bigger than 1 and returns `indexesOfPipedChars`', () => {
    expect(autoCorrectedMmddyyyyPipe('1')).to.deep.equal({value: '1', indexesOfPipedChars: []})
    expect(autoCorrectedMmddyyyyPipe('2')).to.deep.equal({value: '02', indexesOfPipedChars: [0]})
  })

  it('returns false if month 1st digit is 1 and 2nd digit is bigger than 2', () => {
    expect(autoCorrectedMmddyyyyPipe('14')).to.equal(false)
  })

  it('returns false if month 1st digit is 0 and 2nd digit is also 0', () => {
    expect(autoCorrectedMmddyyyyPipe('00')).to.equal(false)
  })

  it('completes the day if the 1st digit is bigger than 3 and returns `indexesOfPipedChars`', () => {
    expect(autoCorrectedMmddyyyyPipe('12/3')).to.deep.equal({value: '12/3', indexesOfPipedChars: []})
    expect(autoCorrectedMmddyyyyPipe('12/4')).to.deep.equal({value: '12/04', indexesOfPipedChars: [3]})
  })

  it('returns false if day 1st digit is 3 and 2nd digit is bigger than 1', () => {
    expect(autoCorrectedMmddyyyyPipe('12/32')).to.equal(false)
  })

  it('returns false if day 1st digit is 0 and 2nd digit is also 0', () => {
    expect(autoCorrectedMmddyyyyPipe('12/00')).to.equal(false)
  })

  it('completes the year to `200` if the 1st digit is 0', () => {
    expect(autoCorrectedMmddyyyyPipe('12/31/0')).to.deep.equal({value: '12/31/200', indexesOfPipedChars: [6, 7]})
  })
})
