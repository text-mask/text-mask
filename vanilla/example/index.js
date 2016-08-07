import maskInput from '../src/vanillaTextMask'

var myInput = document.querySelector('.myInput')

maskInput({
  inputElement: myInput,
  mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
})
