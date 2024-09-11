# Angular Input Mask

## Getting started

First, install it.

```bash
npm i angular1-text-mask --save
```

Then, use it as follows:

```html
<script
  type="text/javascript"
  src="./node_modules/angular1-text-mask/dist/angular1TextMask.js"
></script>
<script type="text/javascript">
  // First add Text Mask as a module
  angular
    .module("app", ["text-mask"])

    // Then use it in your Angular1 component as such
    .component("app", {
      controller: "DemoController as $ctrl",
      template:
        '<input text-mask="$ctrl.textMaskConfig" ng-model="$ctrl.myModel" type="text"/>',
    })
    .controller(function () {
      var vm = this;

      this.myModel = "";
      this.modelWithValue = "5554441234";

      this.textMaskConfig = {
        mask: [
          "(",
          /[1-9]/,
          /\d/,
          /\d/,
          ")",
          " ",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ],
      };
    });
</script>
```

## Documentation

As you can see in the code above, you are passing an object to the `text-mask` directive.

For more information about the values that the `text-mask` object accepts, see
**[this page](https://github.com/im-open/text-mask/blob/master/componentDocumentation.md#readme)**.

## Example

To see an example of a minimal app running with this directive, follow these steps:

1. Clone the repo, `git clone git@github.com:im-open/text-mask.git`
1. `cd text-mask`
1. `npm install`
1. `npm run angular1:dev`
1. Open [http://localhost:3000](http://localhost:3000)

The code of the example is in [`angular1/example`](https://github.com/im-open/text-mask/tree/master/angular1/example).
