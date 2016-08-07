import {Directive, ElementRef, Input} from '@angular/core'
import {NgControl} from '@angular/forms'
import createTextMaskInputElement from '../../core/src/createTextMaskInputElement'

@Directive({
  host: {
    '(input)': 'onInput()'
  },
  selector: 'input[textMask]'
})
export default class MaskedInputDirective {
  private textMaskInputElement: any
  private inputElement:HTMLInputElement

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

  constructor(inputElement: ElementRef, private ngControl: NgControl) {
    this.inputElement = inputElement.nativeElement
  }

  ngOnInit() {
    this.textMaskInputElement = createTextMaskInputElement(Object.assign({inputElement: this.inputElement, }, this.textMaskConfig))

    // This ensures that initial model value gets masked
    setTimeout(() => this.onInput())
  }

  onInput() {
    this.textMaskInputElement.update()
    this.ngControl.viewToModelUpdate(this.inputElement.value)
  }
}

export {MaskedInputDirective as Directive}
