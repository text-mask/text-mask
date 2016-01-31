# How it works

This package is made of two main functions: `conformToPattern` and `adjustCaretPosition`.

## `conformToPattern`

This function takes two parameters, user input string and pattern string. For example:

```js
const phoneNumber = conformToString('5558454433', '(111) 111-1111')

phoneNumber // (555) 845-4433
```

If we want to conform user input to to a pattern, we can listen for the `onChange` event of the
`<input/>` element, conform every change the user makes to a given pattern and set the conformed
string as the new value of the `<input/>` element. This approach works well, except that
every time we set the value, we lose the caret position.

To mitigate the caret position problem, we can use `adjustCaretPosition` function.

## `adjustCaretPosition`

This function takes four parameters:

0. previous user input (string)
0. new user input (string)
0. current caret position (integer)
0. pattern (string)

By diffing previous user input and new user input, and by using other information gleaned from
these parameters, `adjustCaretPosition` can guess where the caret should be after every change.

It can be used like this:

```js

const caretPosition = adjustCaretPosition(
  previousInputValue,
  newInputValue,
  ,
  '(111) 111-1111'
)

setSelection(this.refs.hello, {start: caretPosition, end: caretPosition})

```
