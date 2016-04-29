# JavaScript Input Mask

## Getting started

First, install it.

```
npm i @msafi/vanilla-text-mask --save
```

Then, use it as follows:

```html
<script
  type="text/javascript"
  src="./node_modules/@msafi/vanilla-text-mask/dist/textMask.js"></script>
<script type="text/javascript">
  var phoneMask = '(111) 111-1111'

  // Assuming you have an input element in your HTML with the class .myInput
  var myInput = document.querySelector('.myInput')

  // You can set the placeholder of myInput
  myInput.placeholder = textMask.convertMaskToPlaceholder(phoneMask)

  textMask.maskInput({
    element: myInput,
    mask: phoneMask
  })
```
