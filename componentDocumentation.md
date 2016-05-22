# Text Mask documentation

Text Mask accepts the following values:

* `mask` (string)
* `guide` (boolean)

## `mask`

`mask` is a string that defines how the user input is going to be masked.

### Examples

Description | Mask
--- | ---
US phone number | `(111) 111-1111`
Canadian postal code | `U1U 1U1`


### Masking characters

You can use any of the characters below to define your mask

Character | Description
--- | ---
`1` | Any number
`A` | Any letter
`?` | Any number or letter
`U` | Any letter (will be transformed to uppercase)
`L` | Any letter (will be transformed to lowercase)

## `guide`

`guide` is a boolean that tells the component whether to be in *guide* or *no guide* mode.

**It is set to `true` by default.**

### Guide mode

<p align="center">
<img src="assets/guideMode.gif"/>
</p>

When `guide` is `true`, Text Mask always shows both placeholder characters and non-placeholder
mask characters.

### No-guide mode

<p align="center">
<img src="assets/noGuideMode.gif"/>
</p>

When `guide` is `false`, Text Mask doesn't print out placeholder characters and only adds mask
characters when the user reaches them as they're typing.
