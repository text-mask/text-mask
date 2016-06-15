Thank you for your interest in contributing. We do need help!

#### How the project is structured

Text Mask has framework **integration** for different frameworks, like React in `/react`
and Angular in `/angular2`. Under the hood, these **integrations** are powered by the
same **core** `/core`.

We need help mostly with the *integrations* since they require specific framework knowledge, which
we don't have.

#### How to run the code

1. Clone this repository
1. In its root, run `npm install`

The next command depends on the framework integration you're interested in.

Say you're interested in Angular 2 integration. All you have to do is run...

1. `npm run angular2:dev` in one terminal, and
1. `npm run angular2:tdd` in another terminal **(optional)**

With that, you're almost ready to start hacking on Text Mask!

`npm run angular2:dev` will start an HTTP server and a webpack process.

1. The HTTP server will serve the content of `angular2/example`, and
1. The webpack process will build the code in `angular2/src` along with the code in `core/src`.

To reach the HTTP server, load [http://localhost:3000](http://localhost:3000)

`npm run angular2:tdd` will run the test suite at `angular2/test`.

Both `npm run angular2:dev` and `npm run angular2:dev` will watch all relevant files for changes.
When a change is detected, they will recompile and rebuild the code automatically.

##### How about other framework integrations?

They all work the same way. If instead of Angular 2, you're interested in, say, React, you would do

1. `npm run react:dev`
1. `npm run react:tdd`

Check out the scripts section of the root `package.json` to see the specific spellings.

##### How about running the code for the `core`?

Since the core is required by all framework integrations, it is included in the development
process of any framework integration. As mentioned earlier, doing something like
`npm run angular2:dev` will allow you to develop both Angular 2 and core. But instead of running
the Angular 2 test suite with `npm run angular2:tdd` you will wanna run the core's test suite with
`npm run core:tdd`.

#### What you see in `http://localhost:3000`

`http://localhost:3000` shows one thing: a masked input with a phone mask. Nothing else.

If you wanna change any Text Mask configurations, you would do that from the code itself.

#### It doesn't make sense!

If this doesn't make sense, sorry! If you would like to contribute, please file an issue or
email me at msafi@msafi.com with any questions and I'd be happy to help.
