const createNumberMask = (isVerify()) ?
  require('../dist/createNumberMask.js').default :
  require('../src/createNumberMask.js').default

describe('createNumberMask', () => {
  it('can returns a configured currency mask', () => {
    let numberMask = createNumberMask()

    expect(numberMask).to.be.a('function')
  })

  it('takes a prefix', () => {
    let numberMask = createNumberMask({prefix: '$'})

    expect(numberMask('12')).to.deep.equal(['$', /\d/, /\d/])
  })

  it('takes a suffix', () => {
    let numberMask = createNumberMask({suffix: ' $', prefix: ''})

    expect(numberMask('12')).to.deep.equal([/\d/, /\d/, ' ', '$'])
  })

  it('can be configured to add a thousands separator or not', () => {
    let numberMaskWithoutThousandsSeparator = createNumberMask({includeThousandsSeparator: false})
    expect(numberMaskWithoutThousandsSeparator('1000')).to.deep.equal(['$', /\d/, /\d/, /\d/, /\d/])

    let numberMaskWithThousandsSeparator = createNumberMask()
    expect(numberMaskWithThousandsSeparator('1000')).to.deep.equal(['$', /\d/, ',', /\d/, /\d/, /\d/])
  })

  it('can be configured with a custom character for the thousands separator', () => {
    let numberMask = createNumberMask({thousandsSeparatorSymbol: '.'})

    expect(numberMask('1000')).to.deep.equal(['$', /\d/, '.', /\d/, /\d/, /\d/])
  })

  it('can be configured to accept a fraction and returns the fraction separator with caret traps', () => {
    let numberMask = createNumberMask({allowDecimal: true})

    expect(numberMask('1000.')).to.deep.equal(['$', /\d/, ',', /\d/, /\d/, /\d/, '[]', '.', '[]'])
  })

  it('rejects fractions by default', () => {
    let numberMask = createNumberMask()

    expect(numberMask('1000.')).to.deep.equal(['$', /\d/, ',', /\d/, /\d/, /\d/])
  })

  it('can be configured with a custom character for the fraction separator', () => {
    let numberMask = createNumberMask({
      allowDecimal: true,
      decimalSymbol: ',',
      thousandsSeparatorSymbol: '.'
    })

    expect(numberMask('1000,')).to.deep.equal(['$', /\d/, '.', /\d/, /\d/, /\d/, '[]', ',', '[]'])
  })

  it('can limit the length of the fraction', () => {
    let numberMask = createNumberMask({allowDecimal: true, decimalLimit: 2})

    expect(numberMask('1000.3823')).to.deep.equal(['$', /\d/, ',', /\d/, /\d/, /\d/, '[]', '.', '[]', /\d/, /\d/])
  })

  it('can require a fraction', () => {
    let numberMask = createNumberMask({requireDecimal: true})

    expect(numberMask('1000')).to.deep.equal(['$', /\d/, ',', /\d/, /\d/, /\d/, '[]', '.', '[]', /\d/, /\d/])
  })

  describe('numberMask default behavior', () => {
    let numberMask = null

    beforeEach(() => {
      numberMask = createNumberMask()
    })

    it('returns a mask that has the same number of digits as the given number', () => {
      expect(numberMask('20382')).to.deep.equal(['$', /\d/, /\d/, ',', /\d/, /\d/, /\d/])
    })

    it('uses the dollar symbol as the default prefix', () => {
      expect(numberMask('1')).to.deep.equal(['$', /\d/])
    })

    it('adds no suffix by default', () => {
      expect(numberMask('1')).to.deep.equal(['$', /\d/])
    })

    it('returns a mask that appends the currency symbol', () => {
      expect(numberMask('1')).to.deep.equal(['$', /\d/])
    })

    it('adds adds a comma after a thousand', () => {
      expect(numberMask('1000')).to.deep.equal(['$', /\d/, ',', /\d/, /\d/, /\d/])
    })

    it('adds as many commas as needed', () => {
      expect(numberMask('23984209342084'))
        .to
        .deep
        .equal(
          ['$', /\d/, /\d/, ',', /\d/, /\d/, /\d/, ',', /\d/, /\d/, /\d/, ',', /\d/, /\d/, /\d/, ',', /\d/, /\d/, /\d/]
        )
    })

    it('accepts any string and strips out any non-digit characters', () => {
      expect(numberMask('h4x0r sp43k')).to.deep.equal(['$', /\d/, ',', /\d/, /\d/, /\d/])
    })
  })
})
