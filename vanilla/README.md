# JavaScript Input Mask

## Getting started

First, install it.

```bash
npm i vanilla-text-mask --save
```

Then, use it as follows:

```html
<script
  type="text/javascript"
  src="./node_modules/vanilla-text-mask/dist/textMask.js"></script>
<script type="text/javascript">
  var phoneMask = '(111) 111-1111'

  // Assuming you have an input element in your HTML with the class .myInput
  var myInput = document.querySelector('.myInput')

  textMask.maskInput({
    inputElement: myInput,
    mask: phoneMask
  })
</script>
```

## Example

To see an example of the code running, follow these steps:

1. Clone the repo, `git clone git@github.com:msafi/text-mask.git`
1. `cd text-mask`
1. `npm install`
1. `npm run vanilla:dev`
1. Open [http://localhost:3000](http://localhost:3000)

The code of the example is in [`vanilla/example`](https://github.com/msafi/text-mask/tree/master/vanilla/example).

## Documentation

As you can see in the example above, you are passing an object to `textMask.maskInput(...)`.

The object takes `element`, which is the `<input/>` element that you are masking. It also
accepts other values which are
[documented here](https://github.com/msafi/text-mask/blob/master/componentDocumentation.md#readme).

## Contributing

We would love some contributions! Check out [this document](https://github.com/msafi/text-mask/blob/master/contributing.md#readme) to get started.

## License

Public domain - [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
