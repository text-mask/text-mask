# JavaScript Input Mask

## Getting started

First, install it.

```bash
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
</script>
```

## Example

For a working example, check out the source code of
[this HTML file](https://msafi.github.io/text-mask/vanilla/example.html).

## License

Public domain - [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
