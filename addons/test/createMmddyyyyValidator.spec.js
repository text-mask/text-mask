const createMmddyyyyValidator = (isVerify()) ?
  require('../dist/createMmddyyyyValidator.js').default :
  require('../src/createMmddyyyyValidator.js').default

describe('createMmddyyyyValidator', () => {
  let configuredMmddyyyyValidator = null

  it('needs to be configured with max and min dates', () => {
    configuredMmddyyyyValidator = createMmddyyyyValidator({
      maximumDate: '08/31/2016', minimumYear: '01/01/1900'
    })
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

  it('accepts config for max date and min date', () => {
    expect(createMmddyyyyValidator({maximumDate: '12/31/2000'})('02/01/2200')).to.equal(false)
    expect(createMmddyyyyValidator({maximumDate: '12/31/2200'})('02/01/2200')).to.equal(true)

    expect(createMmddyyyyValidator({minimumDate: '12/31/2199'})('02/01/2198')).to.equal(false)
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
    const maxMinYears = {maximumDate: '12/31/2016', minimumDate: '01/01/1990'}

    expect(createMmddyyyyValidator(maxMinYears)('02/24/3')).to.equal(false)
    expect(createMmddyyyyValidator(maxMinYears)('02/24/2')).to.equal(true)

    expect(createMmddyyyyValidator(maxMinYears)('02/24/21')).to.equal(false)
    expect(createMmddyyyyValidator(maxMinYears)('02/24/20')).to.equal(true)

    expect(createMmddyyyyValidator(maxMinYears)('02/24/1')).to.equal(true)
    expect(createMmddyyyyValidator(maxMinYears)('02/24/18')).to.equal(false)

    expect(createMmddyyyyValidator(maxMinYears)('02/24/201')).to.equal(true)
    expect(createMmddyyyyValidator(maxMinYears)('02/24/202')).to.equal(false)

    expect(createMmddyyyyValidator(maxMinYears)('02/24/199')).to.equal(true)
    expect(createMmddyyyyValidator(maxMinYears)('02/24/198')).to.equal(false)

    expect(createMmddyyyyValidator(maxMinYears)('02/24/2016')).to.equal(true)
    expect(createMmddyyyyValidator(maxMinYears)('02/24/2017')).to.equal(false)

    expect(createMmddyyyyValidator(maxMinYears)('02/24/1990')).to.equal(true)
    expect(createMmddyyyyValidator(maxMinYears)('02/24/1989')).to.equal(false)
  })

  it('only accepts leap year if given month is February and day is 29', () => {
    expect(configuredMmddyyyyValidator('02/29/2016')).to.equal(true)
    expect(configuredMmddyyyyValidator('02/29/2015')).to.equal(false)
  })

  it('confirms that the date is bigger than the minimum date and smaller than the ' +
    'maximum date when user enters the last character', () => {
    const maxMinYears = {minimumDate: '02/01/1990'}

    expect(createMmddyyyyValidator(maxMinYears)('01/24/199')).to.equal(true)
    expect(createMmddyyyyValidator(maxMinYears)('01/24/1990')).to.equal(false)
  })
})
