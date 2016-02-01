## API documentation

### `convertPatternToPlaceholder(pattern)`

This function takes a pattern (string), i.e. `11/11/1111`, and returns a placeholder (string).

```
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

```
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
