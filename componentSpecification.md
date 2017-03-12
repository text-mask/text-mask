# Components Specification

This document details the specification for the text-mask components.

* Angular1
* Angular2
* Ember
* React
* Vanilla
* Vue

## Component Behaviour

At a basic level, the component should initialize the `textMaskInputElement` object and call the `update` method whenever the `inputElement.value` changes.

If the `textMaskConfig` changes the component should update to reflect those changes immediately.  In cases where that is not practical then the component should update on the next key-press.

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
