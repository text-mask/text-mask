import createTextMaskInputElement from '../../core/src/createTextMaskInputElement'

const emailMask = (isVerify()) ?
  require('../dist/emailMask.js').default :
  require('../src/emailMask.js').default

describe('emailMask', () => {
  let inputElement
  let textMaskInputElement

  beforeEach(() => {
    inputElement = document.createElement('input')
    textMaskInputElement = createTextMaskInputElement({inputElement, mask: emailMask})
  })

  it('masks initial input as follows `a@ .`', () => {
    input('a', 1)
    expectResults('a@ .', 1)
  })

  it('allows a dot at the end of the local part', () => {
    input('a', 1)
    expectResults('a@ .', 1)

    input('a.@ .', 2)
    expectResults('a.@ .', 2)
  })

  it('moves the caret to after the @ symbol when user enters an @ symbol where the current @ symbol is', () => {
    input('a', 1)
    expectResults('a@ .', 1)

    input('a@@ .', 2)
    expectResults('a@.', 2)
  })

  it('moves the caret to after the TLD dot when user enters a dot where the current TLD dot is', () => {
    input('a@a.com', 7)
    expectResults('a@a.com', 7)

    input('a@a..com', 4)
    expectResults('a@a.com', 4)
  })

  it('limits the number of @ symbols in input to 1', () => {
    input('a@a.com', 7)
    expectResults('a@a.com', 7)
    input('@a@a.com', 1)
    expectResults('@aa.com', 1)

    input('a@a.com', 7)
    expectResults('a@a.com', 7)
    input('a@a@.com', 4)
    expectResults('a@a.com', 3)

    input('a@a.com', 7)
    expectResults('a@a.com', 7)
    input('a@a.co@m', 7)
    expectResults('a@a.com', 6)
  })

  it('does not add a placeholder in the end when user types a dot after the TLD dot when there is no TLD', () => {
    input('a@a.', 4)
    expectResults('a@a.', 4)

    input('a@a..', 5)
    expectResults('a@a.', 4)
  })

  it('removes the dot in the end if the domain part already contains a dot', () => {
    input('a@acom.', 7)
    expectResults('a@acom.', 7)

    input('a@a.com.', 4)
    expectResults('a@a.com', 4)
  })

  it('prevents two consecutive dots', () => {
    input('a@a.a.com', 9)
    expectResults('a@a.a.com', 9)

    input('a@a..a.com', 5)
    expectResults('a@a.a.com', 4)
  })

  it('just moves the caret over when user enters a dot before the TLD dot', () => {
    input('a@a.com', 7)
    expectResults('a@a.com', 7)

    input('a@a..com', 4)
    expectResults('a@a.com', 4)
  })

  it('works as expected', () => {
    input('a', 1)
    expectResults('a@ .', 1)

    input('@ .', 0)
    expectResults('', 0)

    input('a', 1)
    expectResults('a@ .', 1)

    input('a@@ .', 2)
    expectResults('a@.', 2)

    input('a@f_.', 3)
    expectResults('a@f.', 3)

    input('af.', 1)
    expectResults('a@f.', 1)

    input('a.@f.', 2)
    expectResults('a.@f.', 2)

    input('m', 1)
    expectResults('m@ .', 1)

    input('m@k .', 3)
    expectResults('m@k.', 3)

    input('m@.k.', 3)
    expectResults('m@k.', 2)

    input('m@k', 3)
    expectResults('m@k.', 3)

    input('m@k..', 5)
    expectResults('m@k.', 4)

    input('m@k.s', 5)
    expectResults('m@k.s', 5)

    input('m@ks', 3)
    expectResults('m@ks.', 3)

    input('m@ks.a', 6)
    expectResults('m@ks.a', 6)

    input('m.@ks.a', 2)
    expectResults('m.@ks.a', 2)

    input('m.o@ks.a', 3)
    expectResults('m.o@ks.a', 3)
  })

  function input(rawValue, currentCaretPosition) {
    inputElement.focus()
    inputElement.value = rawValue
    inputElement.selectionStart = currentCaretPosition
    textMaskInputElement.update()
  }

  function expectResults(conformedValue, adjustedCaretPosition) {
    expect(inputElement.value).to.equal(conformedValue)
    expect(inputElement.selectionStart).to.equal(adjustedCaretPosition)
  }
})
