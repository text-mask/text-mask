# Components Specification

This document details the specification for the text-mask components.

* Angular1
* Angular2
* Ember
* React
* Vanilla
* Vue

At a basic level, the component should initialize the `textMaskInputElement` object and then call the `update` method whenever the `inputElement.value` changes.

## Component Behaviour

Components should call `update` on `keydown`, when the `value` is changed, on paste and also when any of the `textMaskConfig` properties change.

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
