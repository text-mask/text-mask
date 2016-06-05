import mmddyyyyValidator from '../src/mmddyyyyValidator.js'

describe('mmddyyyyValidator', () => {
  it('takes conformed user input', () => {
    expect(() => {
      mmddyyyyValidator('12093')
    }).to.not.throw()
  })
})
