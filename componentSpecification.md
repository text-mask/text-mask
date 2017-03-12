# Components Specification

This document details the specification for the text-mask components.

* Angular1
* Angular2
* Ember
* React
* Vanilla
* Vue

## Component Behaviour

All components should initialize the `textMaskInputElement` object and call `textMaskInputElement.update` to conform the initial value according to the properties of the `textMaskConfig`.

The `textMaskInputElement.update` method should be called again whenever the `inputElement.value` changes.

If the `textMaskConfig` changes the component should update the `inputElement.value` to reflect those changes.

Where components have a `model`, the component should only update the `model` when the user interacts with the input element.  The `model` should not be modified when the component is first rendered and changing properties of the `textMaskConfig` should not update the `model` until the next keypress.

## Component Structure

Components should provide the following basic structure.

```js
{
  // an object that stores all config for the text mask
  textMaskConfig: {Object},

  // the text mask object returned from `createTextMaskInputElement`
  textMaskInputElement: {Object},

  // alias to `textMaskInputElement.update`
  update(rawValue, textMaskConfig) {
    this.textMaskInputElement.update(...arguments)
  }
}
```

## Component Lifecycle

### Render

* Render an `input` element.
* Call `createTextMaskInputElement` method.
* Attach any listeners that it requires.
* Call `update` to conform the value in the `input` element.

### Input

* Call `update` to conform the value in the `inputElement`.
* Set the conformed value to the model.

### Destroy

* Remove event listeners.

## Tests

The following tests should be implemented for each component.

* initializes `textMaskInputElement` property
* initializes mask on first render
* does not allow masked characters
* mask can be disabled by setting the `mask` to `false`
* accepts Array as mask property
* accepts Function as mask property
* accepts Boolean as mask property
* accepts Object as mask property
