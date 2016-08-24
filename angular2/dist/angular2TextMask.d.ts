import { ElementRef } from '@angular/core';
import { FormControl, ControlValueAccessor } from '@angular/forms';
export default class MaskedInputDirective implements ControlValueAccessor {
    private textMaskInputElement;
    private inputElement;
    textMaskConfig: {
        mask: string;
        guide: boolean;
        placeholderChar: string;
        pipe: any;
        keepCharPositions: boolean;
        onReject: any;
        onAccept: any;
    };
    formControl: FormControl;
    constructor(inputElement: ElementRef);
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(): void;
    ngOnInit(): void;
    onInput(): void;
}
export { MaskedInputDirective as Directive };
