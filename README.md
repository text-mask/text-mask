## Demo

See the demo [here](msafi.github.io/string-pattern/#demo).

## Getting started

I'll try to make `string-pattern` easier to use and write a proper getting started guide,
but for now, if you're using React, Babel, and webpack, the following instructions may
be sufficient.

First...

```js
npm i string-pattern --save
```

Then, in the file where you wanna use it...

```js
import {
  convertPatternToPlaceholder,
  conformToPattern,
  adjustCaretPosition
} from 'string-pattern'

```

And...

* See the source code of [this component](https://github.com/msafi/string-pattern/blob/49a06df575697fbd82a4497fbd21d3f93bf26fdd/demo/src/components/input.jsx)
for how `string-pattern` can be used with React, and
* read the [API documentation](#api-documentation)

## Why

`string-pattern` has a few temporary short-comings. But it's still totally worth your time, I think, because:

* It works
* It has a bunch of [unit tests](https://github.com/msafi/string-pattern/tree/master/test)
* It's small
* It's designed to be least disruptive to normal user interactions with the `input` element
* It's powered by a couple of short algorithms only, which makes it less brittle
* You'll look like a cool hipster for being the only one who uses it!

## API documentation

### `convertPatternToPlaceholder(pattern)`

This function takes a pattern (string), i.e. `11/11/1111`, and returns a placeholder (string).

```js
const placeholder = convertPatternToPlaceholder('11/11/1111')

placeholder // __/__/____
```

You can use this function to initialize an `input` element to a placeholder value.

---

### `conformToPattern(userInput, pattern)`

This function takes two arguments:

* userInput (string): the string value that you want to conform to the pattern
* pattern (string): the pattern to which you want the string to conform

And it returns the user input conformed to the given pattern as a string.

```js
const phoneNumber = conformToPattern('5554833902', '(111) 111-1111')

phoneNumber // (555) 483-3902
```

Whenever the value of the `input` element changes, you can pass that value to `conformToPattern`
and it'll make sure that the string looks like the given pattern. You can then set that conformed
string as the new value of the `input` element.

---

### `adjustCaretPosition(previousUserInput, newUserInput, currentCaretPosition, pattern)`

When you set the value of the `input` element, you lose the position of the caret. This function
helps you restore the position.

It takes three arguments:

* previousUserInput (string): the string value of the `input` before the last time you set its value
* newUserInput (string): the new string value to which you set the `input`
* currentCaretPosition (integer): the position of the caret before the last time you set `input` value
* pattern (string): the pattern to which you conformed the string

The functions diffs the new input and the previous input to guess where the caret should be.

To see how it can be used, please take a look at this
[source code](https://github.com/msafi/string-pattern/blob/49a06df575697fbd82a4497fbd21d3f93bf26fdd/demo/src/components/input.jsx).

### If you need help, please [file an issue](https://github.com/msafi/string-pattern/issues).
