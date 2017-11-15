import { Directive, ElementRef, forwardRef, Input, Inject, NgModule, OnChanges, Provider, Renderer, SimpleChanges } from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore'

export const MASKEDINPUT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MaskedInputDirective),
  multi: true
}

export class TextMaskConfig {
  mask: (string | RegExp)[] | Function
  guide?: boolean
  placeholderChar?: string
  pipe?: Function
  keepCharPositions?: boolean
  showMask?: boolean
  indexOfChildElementToMask?: number
}

@Directive({
  host: {
    '(input)': 'onInput($event.target.value)',
    '(blur)': '_onTouched()'
  },
  selector: '[textMask]',
  exportAs: 'textMask',
  providers: [MASKEDINPUT_VALUE_ACCESSOR]
})
export class MaskedInputDirective implements ControlValueAccessor, OnChanges {
  private textMaskInputElement: any
  private inputElement: HTMLInputElement

  // stores the last value for comparison
  private lastValue: any

  @Input('textMask')
  textMaskConfig: TextMaskConfig = {
    mask: [],
    guide: true,
    placeholderChar: '_',
    pipe: undefined,
    keepCharPositions: false,
    showMask: false,
    indexOfChildElementToMask: 0,
  }

  _onTouched = () => { }
  _onChange = (_: any) => { }

  constructor( @Inject(Renderer) private renderer: Renderer, @Inject(ElementRef) private element: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    this.setupMask(true)
    if (this.textMaskInputElement !== undefined) {
      this.textMaskInputElement.update(this.inputElement.value)
    }
  }

  writeValue(value: any) {
    this.setupMask()

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
    this.setupMask()

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

  private setupMask(create = false) {
    if (!this.inputElement) {
      if (this.element.nativeElement.tagName === 'INPUT') {
        // `textMask` directive is used directly on an input element
        this.inputElement = this.element.nativeElement
      } else {
        // `textMask` directive is used on an abstracted input element, `md-input-container`, etc
        // The default is to mask the first input element found, but it can be configured using the indexOfChildElementToMask config value
        const childElementToMask = this.textMaskConfig.indexOfChildElementToMask ? this.textMaskConfig.indexOfChildElementToMask : 0
        this.inputElement = this.element.nativeElement.getElementsByTagName('INPUT')[childElementToMask]
      }
    }

    if (this.inputElement && create) {
      this.textMaskInputElement = createTextMaskInputElement(
        Object.assign({ inputElement: this.inputElement }, this.textMaskConfig)
      )
    }

  }
}

@NgModule({
  declarations: [MaskedInputDirective],
  exports: [MaskedInputDirective]
})
export class TextMaskModule { }

export { conformToMask } from 'text-mask-core/dist/textMaskCore'
