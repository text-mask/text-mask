import { ElementRef } from '@angular/core';
import { NgControl, FormControl } from '@angular/forms';
export default class MaskedInputDirective {
    private ngControl;
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
    constructor(inputElement: ElementRef, ngControl: NgControl);
    ngOnInit(): void;
    onInput(): void;
}
export { MaskedInputDirective as Directive };
