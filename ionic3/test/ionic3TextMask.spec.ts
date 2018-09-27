import { IonInputMaskDirective } from '../src/ionic3TextMask'

describe('IonInputMaskDirective', () => {
  it('should create an instance', () => {
    const directive = new IonInputMaskDirective(null, null, false, null)
    expect(directive).toBeTruthy()
  })
})
