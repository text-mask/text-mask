# JavaScript Input Mask

**Note:** IE9 is not supported in this module.

## Getting started

First, install it.

```bash
npm i vanilla-text-mask --save
```

Then, use it as follows:

```html
<script
  type="text/javascript"
  src="./node_modules/vanilla-text-mask/dist/vanillaTextMask.js"></script>
<script type="text/javascript">
  var phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  // Assuming you have an input element in your HTML with the class .myInput
  var myInput = document.querySelector('.myInput')

  var maskedInputController = vanillaTextMask.maskInput({
    inputElement: myInput,
    mask: phoneMask
  })
  
  // Calling `vanillaTextMask.maskInput` adds event listeners to the input element. 
  // If you need to remove those event listeners, you can call
  maskedInputController.destroy()
</script>
```

## Documentation

As you can see in the code above, you are passing an object to `vanillaTextMask.maskInput(...)`.

The object takes `inputElement`, which is the `<input/>` element that you are masking. It also
accepts other values which are
[documented here](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme).

## Example

To see an example of the code running, follow these steps:

1. Clone the repo, `git clone git@github.com:text-mask/text-mask.git`
1. `cd text-mask`
1. `npm install`
1. `npm run vanilla:dev`
1. Open [http://localhost:3000](http://localhost:3000)

The code of the example is in [`vanilla/example`](https://github.com/text-mask/text-mask/tree/master/vanilla/example).

## Contributing

We would love some contributions! Check out [this document](https://github.com/text-mask/text-mask/blob/master/howToContribute.md#readme) to get started.
