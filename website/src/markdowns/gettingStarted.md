## Getting started

I'll try to make `string-pattern` easier to use and write a proper getting started guide,
but for now, if you're using React, Babel, and webpack, the following instructions may
be sufficient.

First...

```
npm i string-pattern --save
```

Then, in the file where you wanna use it...

```
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
