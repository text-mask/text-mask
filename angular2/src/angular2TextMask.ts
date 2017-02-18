import { Directive, ElementRef, forwardRef, Input, NgModule, Renderer } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms'
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore'

@Directive({
  host: {
    '(input)': 'onInput($event.target.value)',
    '(blur)': '_onTouched()'
  },
  selector: '[textMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MaskedInputDirective),
    multi: true
  }]
})
export class MaskedInputDirective implements ControlValueAccessor{
  private textMaskInputElement: any
  private inputElement:HTMLInputElement

  // stores the last value for comparison
  private lastValue: any

  @Input('textMask')
  textMaskConfig = {
    mask: '',
    guide: true,
    placeholderChar: '_',
    pipe: undefined,
    keepCharPositions: false,
  }

  _onTouched = () => {}
  _onChange = (_: any) => {}

  constructor(private renderer: Renderer, private element: ElementRef) {}

  private setupMask() {
    if (this.element.nativeElement.tagName === 'INPUT') {
      // `textMask` directive is used directly on an input element
      this.inputElement = this.element.nativeElement
    } else {
      // `textMask` directive is used on an abstracted input element, `ion-input`, `md-input`, etc
      this.inputElement = this.element.nativeElement.getElementsByTagName('INPUT')[0]
    }

    if (this.inputElement) {
      this.textMaskInputElement = createTextMaskInputElement(
          Object.assign({inputElement: this.inputElement}, this.textMaskConfig)
      )
    }
  }

  writeValue(value: any) {
    if (!this.inputElement) {
      this.setupMask()
    }

    if (this.textMaskInputElement !== undefined) {
      this.textMaskInputElement.update(value)
    }
  }

  registerOnChange(fn: (value: any) => any): void { this._onChange = fn }

  registerOnTouched(fn: () => any): void { this._onTouched = fn }

  onInput(value) {
    if (!this.inputElement) {
      this.setupMask()
    }

    this.textMaskInputElement.update(value)
    // check against the last value to prevent firing ngModelChange despite no changes
    if (this.lastValue !== value) {
      this.lastValue = value
      this._onChange(value)
    }
  }

  setDisabledState(isDisabled: boolean) {
    this.renderer.setElementProperty(this.element.nativeElement, 'disabled', isDisabled)
  }
}

@NgModule({
  declarations: [MaskedInputDirective],
  exports: [MaskedInputDirective],
  imports: [CommonModule]
})
export class TextMaskModule {}
export {conformToMask} from 'text-mask-core/dist/textMaskCore'
