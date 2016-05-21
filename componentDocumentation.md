# Text Mask component documentation

Text Mask component accepts the following values:

* `mask` (string)
* `guide` (boolean)

## Mask

`mask` is a string that defines how the user input is going to be masked.

### Examples

* US phone number: `(111) 111-1111`
* Canadian postal code: `U1U 1U1`

### Masking characters

You can use any of the characters below to define your mask

Character | Description
--- | ---
`1` | Any number
`A` | Any letter
`?` | Any number or letter
`U` | Any letter (will be transformed to uppercase)
`L` | Any letter (will be transformed to lowercase)

## Guide

`guide` is a boolean that tells a Text Mask component whether to be in *guide* or *no guide* mode.

### Guide mode

