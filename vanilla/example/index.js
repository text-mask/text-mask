import maskInput from '../src/vanillaTextMask'

var myInput = document.querySelector('.myInput')

maskInput({inputElement: myInput, mask: '(111) 111-1111'})
