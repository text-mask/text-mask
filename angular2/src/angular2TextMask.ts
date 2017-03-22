import { Directive, ElementRef, forwardRef, Input, NgModule, OnChanges, Provider, Renderer, SimpleChanges } from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore'

export const MASKEDINPUT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MaskedInputDirective),
  multi: true
}

@Directive({
  host: {
    '(input)': 'onInput($event.target.value)',
    '(blur)': '_onTouched()'
  },
  selector: '[textMask]',
  providers: [MASKEDINPUT_VALUE_ACCESSOR]
})
export class MaskedInputDirective implements ControlValueAccessor, OnChanges {
  private textMaskInputElement: any
  private inputElement: HTMLInputElement

  // stores the last value for comparison
  private lastValue: any

  @Input('textMask')
  textMaskConfig = {
    mask: [],
    guide: true,
    placeholderChar: '_',
    pipe: undefined,
    keepCharPositions: false,
  }

  _onTouched = () => {}
  _onChange = (_: any) => {}

  constructor(private renderer: Renderer, private element: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    this.setupMask()
    if (this.textMaskInputElement !== undefined) {
      this.textMaskInputElement.update(this.inputElement.value)
    }
  }

  writeValue(value: any) {
    if (!this.inputElement) {
      this.setupMask()
    }

    // set the initial value for cases where the mask is disabled
    const normalizedValue = value == null ? '' : value
    this.renderer.setElementProperty(this.inputElement, 'value', normalizedValue)

    if (this.textMaskInputElement !== undefined) {
      this.textMaskInputElement.update(value)
    }
  }

  registerOnChange(fn: (value: any) => any): void { this._onChange = fn }

  registerOnTouched(fn: () => any): void { this._onTouched = fn }

  setDisabledState(isDisabled: boolean) {
    this.renderer.setElementProperty(this.element.nativeElement, 'disabled', isDisabled)
  }
  
  onInput(value) {
    if (!this.inputElement) {
      this.setupMask()
    }

    if (this.textMaskInputElement !== undefined) {
      this.textMaskInputElement.update(value)
      
      // get the updated value
      value = this.inputElement.value

      // check against the last value to prevent firing ngModelChange despite no changes
      if (this.lastValue !== value) {
        this.lastValue = value
        this._onChange(value)
      }
    }
  }

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
}

@NgModule({
  declarations: [MaskedInputDirective],
  exports: [MaskedInputDirective]
})
export class TextMaskModule {}

export { conformToMask } from 'text-mask-core/dist/textMaskCore'
