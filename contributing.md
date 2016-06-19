Thank you for your interest in contributing. We do need help!

This document contains information that will hopefully allow you to better understand the overall
layout of the project.

#### How the project is structured

Text Mask has components for different frameworks, like React in `/react`
and Angular in `/angular2`. Under the hood, these components are powered by the
same **core** `/core`.

Each framework component is published to npm independently. The user only needs to install the
component package. However, the `core` is also published to npm as a separate package, just in case
somebody wishes to use it.

#### The relationship between Text Mask `core` and framework components

Text Mask core has a function called `createComponent`, which all framework components utilize.
This function takes an input element and other text mask configurations and returns an object with
`update` method. Framework components call the `update` method at different points in their life-cycles
to tell Text Mask to conform the value of the input element.

##### The `update` method

When called, `update` will conform whatever is the current `value` of the input element. However, you
can pass an optional string to it and it will conform and show that instead.
This is useful when you want to pass a value to the input element programmatically.

#### How to run the code for development

If you want to run Text Mask, make changes, and see them reflected on an actual page, here's
how to get started:

1. Fork this repository
1. Clone your fork to your computer
1. In the root of the repository, run `npm install`

The next commands depend on the framework component you're interested in.

Say you're interested in Angular 2 component: all you have to do is run...

`npm run angular2:dev`

This command will start an HTTP server and a webpack process.

1. The HTTP server will serve the content of `angular2/example`, and
1. The webpack process will build the code in `angular2/src` along with the code in `core/src`.

To reach the HTTP server, load [http://localhost:3000](http://localhost:3000)

The command will watch all relevant files for changes.
When a change is detected, it will recompile and rebuild the code automatically.

After you've made some changes, send a PR!

##### How about other framework integrations?

They all work the same way. If instead of Angular 2, you're interested in, say, React, you would do

`npm run react:dev`

Check out the scripts section of the root `package.json` to see the specific spellings.

##### How about running the code for the `core`?

Since the core is required by all framework components, it is included in the development
process of any of them. As mentioned earlier, doing something like
`npm run angular2:dev` will allow you to develop both Angular 2 and core. However, you can also run
`npm run core:tdd` in another terminal to run the test suite and make sure your changes are not
causing regressions.

#### What you see in `http://localhost:3000`

`http://localhost:3000` shows one thing: a masked input with a phone mask. Nothing else.

If you wanna change any Text Mask configurations, you would do that from the code itself.

#### More details about folder structure

The folders that make up Text Mask are:

```bash
|- addons (npm package) (contains optional addons/plugins for Text Mask)
|- angular2 (npm package) (Angular 2 component)
|- assets  (contains pictures and other assets required by the GitHub project)
|- common (contains test and setup files common to all framework integrations)
|- core (npm package) (contains pure functions that power Text Mask)
|- react (npm package) (React component)
|- vanilla (npm package) (Vanilla JS component)
|- website (contains the content of https://msafi.github.io/text-mask)
```

#### More help!!

If you would like to contribute and need any help to get started, please file an issue or
email me at [msafi@msafi.com](mailto:msafi@msafi.com) with any questions and I'd be happy to help.
