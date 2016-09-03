import {Directive, ElementRef, Input, OnInit} from '@angular/core'
import {FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms'
import createTextMaskInputElement from '../../core/src/createTextMaskInputElement'

@Directive({
  host: {
    '(input)': 'onInput()'
  },
  selector: '[textMask]',
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: MaskedInputDirective, multi: true}
  ]
})
export default class MaskedInputDirective implements OnInit, ControlValueAccessor{
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

  formControl: FormControl = new FormControl()

  constructor(private element: ElementRef) {}

  ngOnInit() {
    if (this.element.nativeElement.tagName === 'INPUT') {
      // Angular 2
      this.inputElement = this.element.nativeElement
    } else {
      // Ionic 2
      this.inputElement = this.element.nativeElement.children[0]
    }
    this.textMaskInputElement = createTextMaskInputElement(
      Object.assign({inputElement: this.inputElement}, this.textMaskConfig)
    )
  }

  writeValue(value: any) {
    if (this.textMaskInputElement !== undefined) {
      this.textMaskInputElement.update(value)
    }

    try { //Try RC.5+ setValue
      this.formControl.setValue(value)
    }
    catch (e) { //Fallback to RC.4 updateValue
      this.formControl.updateValue(value)
    }
  }

  registerOnChange(fn: (value: any) => void) {
    this.formControl.valueChanges.subscribe(fn)
  }

  registerOnTouched() {}

  onInput() {
    this.textMaskInputElement.update()
    this.writeValue(this.inputElement.value)
  }
}

export {MaskedInputDirective as Directive}
