import mmddyyyyValidator from '../src/mmddyyyyValidator.js'

describe('mmddyyyyValidator', () => {
  it('takes conformed user input', () => {
    expect(() => {
      mmddyyyyValidator('12093')
    }).to.not.throw()
  })

  it('returns a boolean', () => {
    expect(mmddyyyyValidator('12093')).to.be.a('boolean')
  })

  it('validates that the string is a valid date of format mm/dd/yyyy', () => {
    expect(mmddyyyyValidator('11/11/2001')).to.equal(true)
    expect(mmddyyyyValidator('11/99/2001')).to.equal(false)
  })

  it('does not support sparse filling', () => {
    expect(mmddyyyyValidator('02/_2/2001')).to.equal(false)
  })

  it('accepts config for max year and min year', () => {
    expect(mmddyyyyValidator('02/01/2200', {maximumYear: 2000})).to.equal(false)
    expect(mmddyyyyValidator('02/01/2200', {maximumYear: 2200})).to.equal(true)

    expect(mmddyyyyValidator('02/01/2198', {minimumYear: 2199})).to.equal(false)
  })

  it('does not allow a month that starts > 1', () => {
    expect(mmddyyyyValidator('2')).to.equal(false)
    expect(mmddyyyyValidator('1')).to.equal(true)
  })

  it('does not allow a month that is < 1', () => {
    expect(mmddyyyyValidator('0')).to.equal(true)
    expect(mmddyyyyValidator('00')).to.equal(false)
    expect(mmddyyyyValidator('01')).to.equal(true)
  })

  it('does not allow a day that is bigger than 31', () => {
    expect(mmddyyyyValidator('01/32')).to.equal(false)
    expect(mmddyyyyValidator('01/31')).to.equal(true)
  })

  it('does not allow a day that is smaller than 1', () => {
    expect(mmddyyyyValidator('01/0')).to.equal(true)
    expect(mmddyyyyValidator('01/00')).to.equal(false)
  })

  it('knows tha maximum possible number of days in each month', () => {
    expect(mmddyyyyValidator('02/3')).to.equal(false)
    expect(mmddyyyyValidator('02/30')).to.equal(false)
    expect(mmddyyyyValidator('02/29')).to.equal(true)
  })

  it('validates every digit of the year against given max and min', () => {
    const maxMinYears = {maximumYear: 2016, minimumYear: 1990}

    expect(mmddyyyyValidator('02/24/3', maxMinYears)).to.equal(false)
    expect(mmddyyyyValidator('02/24/2', maxMinYears)).to.equal(true)

    expect(mmddyyyyValidator('02/24/21', maxMinYears)).to.equal(false)
    expect(mmddyyyyValidator('02/24/20', maxMinYears)).to.equal(true)

    expect(mmddyyyyValidator('02/24/1', maxMinYears)).to.equal(true)
    expect(mmddyyyyValidator('02/24/18', maxMinYears)).to.equal(false)

    expect(mmddyyyyValidator('02/24/201', maxMinYears)).to.equal(true)
    expect(mmddyyyyValidator('02/24/202', maxMinYears)).to.equal(false)

    expect(mmddyyyyValidator('02/24/199', maxMinYears)).to.equal(true)
    expect(mmddyyyyValidator('02/24/198', maxMinYears)).to.equal(false)

    expect(mmddyyyyValidator('02/24/2016', maxMinYears)).to.equal(true)
    expect(mmddyyyyValidator('02/24/2017', maxMinYears)).to.equal(false)

    expect(mmddyyyyValidator('02/24/1990', maxMinYears)).to.equal(true)
    expect(mmddyyyyValidator('02/24/1989', maxMinYears)).to.equal(false)
  })

  it('only accepts leap year if given month is February and day is 29', () => {
    expect(mmddyyyyValidator('02/29/2016')).to.equal(true)
    expect(mmddyyyyValidator('02/29/2015')).to.equal(false)
  })
})
