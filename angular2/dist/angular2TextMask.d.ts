import { ElementRef } from '@angular/core';
export default class MaskedInputDirective {
    private textMaskInputElement;
    private inputElement;
    private value;
    private propagateChange;
    private propagateTouched;
    textMaskConfig: {
        mask: string;
        guide: boolean;
        placeholderChar: string;
        pipe: any;
        keepCharPositions: boolean;
        onReject: any;
        onAccept: any;
    };
    constructor(inputElement: ElementRef);
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    ngAfterContentInit(): void;
    onInput(): void;
}
export { MaskedInputDirective as Directive };
