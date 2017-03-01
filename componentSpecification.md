# Components expectations

This document details the specification for the text-mask components.

* Angular1
* Angular2
* Ember
* React
* Vanilla
* Vue

## Component Structure

All components should provide the following basic structure

```
{
  // an object that stores all config for the text mask
  config: {Object},

  // the text mask object returned from `createTextMaskInputElement`
  textMaskInputElement: {Object},

  // alias to `textMaskInputElement.update`
  update() {
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

## Input (any keypress)

* The component should call `update` to conform the value in the `inputElement`.
* The component should set the conformed value to the model.

## Destroy

* Remove event listeners.
