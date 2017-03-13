const createAutoCorrectedDatePipe = (isVerify()) ?
  require('../dist/createAutoCorrectedDatePipe.js').default :
  require('../src/createAutoCorrectedDatePipe.js').default

describe('createAutoCorrectedDatePipe', () => {
  let autoCorrectedDatePipe

  it('accepts the date format as the first parameter and returns a date pipe function', () => {
    autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm dd yyyy')
  })

  it('completes the month if the 1st digit is bigger than 1 and returns `indexesOfPipedChars`', () => {
    expect(autoCorrectedDatePipe('1')).to.deep.equal({value: '1', indexesOfPipedChars: []})
    expect(autoCorrectedDatePipe('2')).to.deep.equal({value: '02', indexesOfPipedChars: [0]})
  })

  it('returns false if month 1st digit is 1 and 2nd digit is bigger than 2', () => {
    expect(autoCorrectedDatePipe('14')).to.equal(false)
  })

  it('returns false if month 1st digit is 0 and 2nd digit is also 0', () => {
    expect(autoCorrectedDatePipe('00')).to.equal(false)
  })

  it('completes the day if the 1st digit is bigger than 3 and returns `indexesOfPipedChars`', () => {
    expect(autoCorrectedDatePipe('12/3')).to.deep.equal({value: '12/3', indexesOfPipedChars: []})
    expect(autoCorrectedDatePipe('12/4')).to.deep.equal({value: '12/04', indexesOfPipedChars: [3]})
  })

  it('returns false if day 1st digit is 3 and 2nd digit is bigger than 1', () => {
    expect(autoCorrectedDatePipe('12/32')).to.equal(false)
  })

  it('returns false if day 1st digit is 0 and 2nd digit is also 0', () => {
    expect(autoCorrectedDatePipe('12/00')).to.equal(false)
  })

  it('returns unmodified partial entry if it could develop to correct date', () => {
    expect(autoCorrectedDatePipe('0 /  /    ')).to.deep.equal({value: '0 /  /    ', indexesOfPipedChars: []})
  })

  it('allows yy format', () => {
    let pipe = createAutoCorrectedDatePipe('mm/yy')
    expect(pipe('12/99')).to.deep.equal({value: '12/99', indexesOfPipedChars: []})
  })

  it('allows 00 for yy', () => {
    let pipe = createAutoCorrectedDatePipe('mm dd yy')
    expect(pipe('12 31 00')).to.deep.equal({value: '12 31 00', indexesOfPipedChars: []})
  })
})
