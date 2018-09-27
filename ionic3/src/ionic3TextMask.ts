import { Directive, NgModule, Optional, Inject, Renderer2, ElementRef, Input, SimpleChanges, Host, Self } from '@angular/core';
import { TextInput } from 'ionic-angular';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms'
import { MaskedInputDirective, TextMaskConfig } from 'angular2-text-mask';

/*
 * IonInputMaskDirective
 *
 * Initialization requires a workaround:
 *   MaskedInputDirective's setupMask will not create textMaskInputElement until 
 *   ion-input has a child input element, so we defer any calls to our ngOnChanges 
 *   and writeValue until ngAfterViewInit, when ion-input has spawned a ready input 
 *   control.
 *
 * Keyboard input works as normal as ngModelChange is fired on every value change.
 *
 * Programmatic input requires a workaround in one scenario:
 *
 *   Scenario 1 (programatically setting the value using two-way binding on ngModel):
 *     If strictly using [(ngModel)], then a direct call to angular's setValue 
 *     from _updateValue will pass { emitViewToModelChange: false } when ngModel 
 *     changes, and so our version of writeValue which relies on (ngModelChange) 
 *     will not be called and the mask will not be applied.
 *
 *     We can't just subscribe to ionChange either because ionChange is not always 
 *     fired, as stated in ionic's BaseInput.writeValue: "ngModel fires the first 
 *     time too late, we need to skip the first ngModel update".
 *
 *     The workaround is to perform MaskedInputDirective's writeValue whenever 
 *     BaseInput's writeValue is called, as it gets called via angular's 
 *     _updateValue when ngModel changes programatically. 
 *
 *   Scenario 2 (programatically setting the value using FormControl):
 *     If instead ion-input's value is changed via formControl's setValue (using 
 *     a FormBuilder/FormGroup paradigm) without explicitly passing the option 
 *     { emitViewToModelChange: false }, our version of writeValue will be called 
 *     via (ngModelChange) and the mask will be applied. No workaround required for 
 *     this scenario.
 */

@Directive({
  host: {
    // Leverage the ionBlur/ionFocus events that are fired after Ionic does any 
    // of its own processing on blur/focus to ensure the mask is still applied
    '(ionBlur)': 'ngOnChanges()', 
    '(ionFocus)': 'ngOnChanges()',
    '(ngModelChange)': 'writeValue($event)' // (input): _handleInput() is now redundant, 
                                            // also makes compositionMode inapplicable
  },
  selector: '[ionTextMask]',
  exportAs: 'ionTextMask'
})
export class IonInputMaskDirective extends MaskedInputDirective {
  private changesDeferred: SimpleChanges;
  private writeValueDeferred: any;
  
  @Input('ionTextMask') 
  set ionTextMask(tmc: TextMaskConfig) {
    this.textMaskConfig = tmc;
  }

  constructor(
    renderer: Renderer2,
    private _ionElementRef: ElementRef,
    @Optional() @Inject(COMPOSITION_BUFFER_MODE) compositionMode: boolean,
    @Host() @Self() @Optional() ionInputComponent: TextInput
  ) {
    super(renderer, _ionElementRef, compositionMode);
    
    // Scenario 1 workaround
    if (ionInputComponent) {
      let writeValueBaseInput = ionInputComponent.writeValue;
      
      ionInputComponent.writeValue = (value: any) => {        
        writeValueBaseInput.call(ionInputComponent, value);
        
        if (this.willHaveInputElement())
          this.writeValue(value);
        else
          this.writeValueDeferred = value;
      };
    }
  }   
  
  private willHaveInputElement(): boolean {
    return(this._ionElementRef.nativeElement.getElementsByTagName('INPUT')[0]);
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (this.willHaveInputElement())
      super.ngOnChanges(changes);
    else
      this.changesDeferred = changes;
  }
  
  ngAfterViewInit() {
    if (this.changesDeferred) {
      this.ngOnChanges(this.changesDeferred);
      this.changesDeferred = undefined;
    }
    
    if (this.writeValueDeferred) {
      this.writeValue(this.writeValueDeferred);
      this.writeValueDeferred = undefined;
    }
  }
}

@NgModule({
  declarations: [IonInputMaskDirective],
  exports: [IonInputMaskDirective]
})
export class IonInputMaskModule {}