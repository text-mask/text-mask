import { Directive, NgModule, Optional, Inject, Renderer2, ElementRef, Input } from '@angular/core';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms'
import { MaskedInputDirective, TextMaskConfig } from 'angular2-text-mask';

@Directive({
  host: {
    '(input)': '_handleInput($event.target.value)',
    '(ionBlur)': 'onTouched()',
    '(ngModelChange)': 'ngOnChanges()',
    '(compositionstart)': '_compositionStart()',
    '(compositionend)': '_compositionEnd($event.target.value)'
  },
  selector: '[ionTextMask]',
  exportAs: 'ionTextMask'
})
export class IonInputMaskDirective extends MaskedInputDirective {
  @Input('ionTextMask') 
  set ionicTextMask(tmc: TextMaskConfig) {
    this.textMaskConfig = tmc;
  }

  constructor(
    _renderer: Renderer2,
    _elementRef: ElementRef,
    @Optional() @Inject(COMPOSITION_BUFFER_MODE) _compositionMode: boolean
  ) {
    super(_renderer, _elementRef, _compositionMode);
  }
}

@NgModule({
  declarations: [IonInputMaskDirective],
  exports: [IonInputMaskDirective]
})
export class IonInputMaskModule {}