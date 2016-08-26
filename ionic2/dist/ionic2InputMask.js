"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var createTextMaskInputElement_1 = require('../../core/src/createTextMaskInputElement');
var MaskedInputDirective = (function () {
    function MaskedInputDirective(element) {
        this.element = element;
        this.textMaskConfig = {
            mask: '',
            guide: true,
            placeholderChar: '_',
            pipe: undefined,
            keepCharPositions: false,
            onReject: undefined,
            onAccept: undefined
        };
        this.formControl = new forms_1.FormControl();
    }
    MaskedInputDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.inputElement = this.element.nativeElement.children[0];
        this.textMaskInputElement = createTextMaskInputElement_1.default(Object.assign({ inputElement: this.inputElement }, this.textMaskConfig));
        setTimeout(function () { return _this.onInput(); });
    };
    MaskedInputDirective.prototype.writeValue = function (value) {
        this.textMaskInputElement.update(value);
        this.formControl.updateValue(value);
    };
    MaskedInputDirective.prototype.registerOnChange = function (fn) {
        this.formControl.valueChanges.subscribe(fn);
    };
    MaskedInputDirective.prototype.registerOnTouched = function () { };
    MaskedInputDirective.prototype.onInput = function () {
        this.textMaskInputElement.update();
        this.writeValue(this.inputElement.value);
    };
    __decorate([
        core_1.Input('textMask'), 
        __metadata('design:type', Object)
    ], MaskedInputDirective.prototype, "textMaskConfig", void 0);
    MaskedInputDirective = __decorate([
        core_1.Directive({
            host: {
                '(input)': 'onInput()'
            },
            selector: 'ion-input[textMask]',
            providers: [
                { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: MaskedInputDirective, multi: true }
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], MaskedInputDirective);
    return MaskedInputDirective;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MaskedInputDirective;
exports.Directive = MaskedInputDirective;
//# sourceMappingURL=ionic2InputMask.js.map