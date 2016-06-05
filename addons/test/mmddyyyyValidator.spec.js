import mmddyyyyValidator from '../src/mmddyyyyValidator.js'

describe('mmddyyyyValidator', () => {
  let configuredMmddyyyyValidator = null

  it('needs to be configured with max and min years', () => {
    configuredMmddyyyyValidator = mmddyyyyValidator({maximumYear: 2016, minimumYear: 1900})
  })

  it('takes conformed user input', () => {
    expect(() => {
      configuredMmddyyyyValidator('12093')
    }).to.not.throw()
  })

  it('returns a boolean', () => {
    expect(configuredMmddyyyyValidator('12093')).to.be.a('boolean')
  })

  it('validates that the string is a valid date of format mm/dd/yyyy', () => {
    expect(configuredMmddyyyyValidator('11/11/2001')).to.equal(true)
    expect(configuredMmddyyyyValidator('11/99/2001')).to.equal(false)
  })

  it('does not support sparse filling', () => {
    expect(configuredMmddyyyyValidator('02/_2/2001')).to.equal(false)
  })

  it('accepts config for max year and min year', () => {
    expect(mmddyyyyValidator({maximumYear: 2000})('02/01/2200')).to.equal(false)
    expect(mmddyyyyValidator({maximumYear: 2200})('02/01/2200')).to.equal(true)

    expect(mmddyyyyValidator({minimumYear: 2199})('02/01/2198')).to.equal(false)
  })

  it('does not allow a month that starts > 1', () => {
    expect(configuredMmddyyyyValidator('2')).to.equal(false)
    expect(configuredMmddyyyyValidator('1')).to.equal(true)
  })

  it('does not allow a month that is < 1', () => {
    expect(configuredMmddyyyyValidator('0')).to.equal(true)
    expect(configuredMmddyyyyValidator('00')).to.equal(false)
    expect(configuredMmddyyyyValidator('01')).to.equal(true)
  })

  it('does not allow a day that is bigger than 31', () => {
    expect(configuredMmddyyyyValidator('01/32')).to.equal(false)
    expect(configuredMmddyyyyValidator('01/31')).to.equal(true)
  })

  it('does not allow a day that is smaller than 1', () => {
    expect(configuredMmddyyyyValidator('01/0')).to.equal(true)
    expect(configuredMmddyyyyValidator('01/00')).to.equal(false)
  })

  it('knows tha maximum possible number of days in each month', () => {
    expect(configuredMmddyyyyValidator('02/3')).to.equal(false)
    expect(configuredMmddyyyyValidator('02/30')).to.equal(false)
    expect(configuredMmddyyyyValidator('02/29')).to.equal(true)
  })

  it('validates every digit of the year against given max and min', () => {
    const maxMinYears = {maximumYear: 2016, minimumYear: 1990}

    expect(mmddyyyyValidator(maxMinYears)('02/24/3')).to.equal(false)
    expect(mmddyyyyValidator(maxMinYears)('02/24/2')).to.equal(true)

    expect(mmddyyyyValidator(maxMinYears)('02/24/21')).to.equal(false)
    expect(mmddyyyyValidator(maxMinYears)('02/24/20')).to.equal(true)

    expect(mmddyyyyValidator(maxMinYears)('02/24/1')).to.equal(true)
    expect(mmddyyyyValidator(maxMinYears)('02/24/18')).to.equal(false)

    expect(mmddyyyyValidator(maxMinYears)('02/24/201')).to.equal(true)
    expect(mmddyyyyValidator(maxMinYears)('02/24/202')).to.equal(false)

    expect(mmddyyyyValidator(maxMinYears)('02/24/199')).to.equal(true)
    expect(mmddyyyyValidator(maxMinYears)('02/24/198')).to.equal(false)

    expect(mmddyyyyValidator(maxMinYears)('02/24/2016')).to.equal(true)
    expect(mmddyyyyValidator(maxMinYears)('02/24/2017')).to.equal(false)

    expect(mmddyyyyValidator(maxMinYears)('02/24/1990')).to.equal(true)
    expect(mmddyyyyValidator(maxMinYears)('02/24/1989')).to.equal(false)
  })

  it('only accepts leap year if given month is February and day is 29', () => {
    expect(configuredMmddyyyyValidator('02/29/2016')).to.equal(true)
    expect(configuredMmddyyyyValidator('02/29/2015')).to.equal(false)
  })
})
