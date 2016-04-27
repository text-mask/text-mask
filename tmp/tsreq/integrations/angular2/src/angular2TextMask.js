"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var index_1 = require('../../../core/src/index');
var core_1 = require('angular2/core');
var MaskedInput = (function () {
    function MaskedInput(el) {
        this.previousValue = '';
        this.currentCaretPosition = null;
        this.textMaskConfig = { mask: '' };
        console.log('233333', 233333);
        this.inputElement = el.nativeElement;
    }
    MaskedInput.prototype.ngOnInit = function () {
        this.onChange();
    };
    MaskedInput.prototype.ngOnChanges = function () {
        this.onChange();
    };
    MaskedInput.prototype.onChange = function (updatedValue) {
        if (updatedValue === void 0) { updatedValue = ''; }
        console.log('222', 222);
        this.previousValue = this.conformToMaskResults.output || this.previousValue;
        this.conformToMaskResults = index_1.conformToMask(updatedValue, this.textMaskConfig.mask);
        this.currentCaretPosition = this.inputElement.selectionStart;
        this.inputElement.placeholder = this.inputElement.placeholder ||
            index_1.convertMaskToPlaceholder(this.textMaskConfig.mask);
        this.inputElement.value = (this.conformToMaskResults.output !== this.inputElement.placeholder) ?
            this.conformToMaskResults.output :
            '';
        var caretPosition = index_1.adjustCaretPosition({
            previousInput: this.previousValue,
            conformToMaskResults: this.conformToMaskResults,
            currentCaretPosition: this.currentCaretPosition
        });
        this.inputElement.setSelectionRange(caretPosition, caretPosition);
    };
    __decorate([
        core_1.Input('text-mask')
    ], MaskedInput.prototype, "textMaskConfig", void 0);
    __decorate([
        core_1.HostListener('input', ['$event.target.value'])
    ], MaskedInput.prototype, "onChange", null);
    MaskedInput = __decorate([
        core_1.Directive({
            selector: 'input[text-mask]'
        })
    ], MaskedInput);
    return MaskedInput;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MaskedInput;
var index_2 = require('../../../core/src/index');
exports.conformToMask = index_2.conformToMask;
exports.convertMaskToPlaceholder = index_2.convertMaskToPlaceholder;
exports.adjustCaretPosition = index_2.adjustCaretPosition;
