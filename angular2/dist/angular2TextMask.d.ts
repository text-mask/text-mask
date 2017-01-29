import { ElementRef, OnInit, AfterViewInit, Renderer } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class MaskedInputDirective implements OnInit, AfterViewInit, ControlValueAccessor {
    private renderer;
    private element;
    private textMaskInputElement;
    private inputElement;
    private lastValue;
    textMaskConfig: {
        mask: string;
        guide: boolean;
        placeholderChar: string;
        pipe: any;
        keepCharPositions: boolean;
        onReject: any;
        onAccept: any;
    };
    _onTouched: () => void;
    _onChange: (_: any) => void;
    constructor(renderer: Renderer, element: ElementRef);
    ngAfterViewInit(): void;
    ngOnInit(): void;
    private setupMask();
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
    onInput($event: any): void;
    setDisabledState(isDisabled: boolean): void;
}
export declare class TextMaskModule {
}
export { conformToMask } from 'text-mask-core/dist/textMaskCore';
