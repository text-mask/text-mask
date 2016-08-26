import { 
  Directive,
  ElementRef,
  Input,
  Provider,
  forwardRef
} from '@angular/core'
import { NgControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import createTextMaskInputElement from '../../core/src/createTextMaskInputElement'

const INPUT_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => MaskedInputDirective),
  multi: true
})

@Directive({
  providers:[INPUT_VALUE_ACCESSOR],
  host: {
    '(input)': 'onInput()'
  },
  selector: 'input[textMask]',
})
export default class MaskedInputDirective {
  private textMaskInputElement: any
  private inputElement:HTMLInputElement
  private value : string
  private propagateChange 
  private propagateTouched

  @Input('textMask')
  textMaskConfig = {
    mask: '',
    guide: true,
    placeholderChar: '_',
    pipe: undefined,
    keepCharPositions: false,
    onReject: undefined,
    onAccept: undefined
  }

  constructor(inputElement: ElementRef) {
    this.inputElement = inputElement.nativeElement
  }

  writeValue(value) {
    this.value = value
  }

  registerOnChange(fn) {
    this.propagateChange =  fn
  }

  registerOnTouched(fn) {
    this.propagateTouched = fn
  }

  ngAfterContentInit() {
    this.textMaskInputElement = createTextMaskInputElement(Object.assign({inputElement: this.inputElement, }, this.textMaskConfig))
    this.textMaskInputElement.update(this.value)
    this.propagateChange(this.inputElement.value)
  }

  onInput() {
    this.textMaskInputElement.update()
    this.propagateChange(this.inputElement.value)
  }
}

export {MaskedInputDirective as Directive}
