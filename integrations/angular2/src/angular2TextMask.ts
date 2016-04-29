import {
  conformToMask,
  convertMaskToPlaceholder,
  adjustCaretPosition
} from '../../../core/src/index'

import {Directive, ElementRef, Input, HostListener} from 'angular2/core'

@Directive({
  selector: 'input[text-mask]'
})
export default class MaskedInput {
  private inputElement: HTMLInputElement
  private previousValue = ''
  private conformToMaskResults = {output: ''}
  private currentCaretPosition: number = null

  @Input('text-mask') textMaskConfig = {mask: ''}

  constructor(el: ElementRef) {
    this.inputElement = el.nativeElement
  }

  ngOnInit() {
    this.onChange()
  }

  ngOnChanges() {
    this.onChange()
  }

  @HostListener('input', ['$event.target.value'])
  onChange(updatedValue = '') {
    this.previousValue = (
      this.conformToMaskResults.output ||
      this.previousValue
    )

    this.conformToMaskResults = conformToMask(updatedValue, this.textMaskConfig.mask)
    this.currentCaretPosition = this.inputElement.selectionStart

    this.inputElement.placeholder = (
      this.inputElement.placeholder ||
      convertMaskToPlaceholder(this.textMaskConfig.mask)
    )

    this.inputElement.value = (
      this.conformToMaskResults.output !== this.inputElement.placeholder
    ) ? this.conformToMaskResults.output : ''

    const caretPosition = adjustCaretPosition({
      previousInput: this.previousValue,
      conformToMaskResults: this.conformToMaskResults,
      currentCaretPosition: this.currentCaretPosition
    })

    this.inputElement.setSelectionRange(caretPosition, caretPosition)
  }
}

export {
  conformToMask,
  convertMaskToPlaceholder,
  adjustCaretPosition
} from '../../../core/src/index'
