import { ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, ControlValueAccessor } from '@angular/forms';
export default class MaskedInputDirective implements ControlValueAccessor, AfterViewInit {
    private element;
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
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(): void;
    onInput(): void;
}
export { MaskedInputDirective as Directive };
