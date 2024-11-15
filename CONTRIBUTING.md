# Contributing to React Text Mask

This document contains information that will hopefully allow you to better understand the overall
layout of the project.

## How the project is structured

Coming soon...

## The `update` method

When called, `update` will conform whatever is the current `value` of the input element. However, you
can pass an optional string to it and it will conform and show that instead.
This is useful when you want to pass a value to the input element programmatically.

## How to run the code for development

If you want to run Text Mask, make changes, and see them reflected on an actual page, here's
how to get started:

1. Fork this repository
1. Clone your fork to your computer
1. In the root of the repository, run `yarn`

### Start the development server

`yarn storybook`

This command will start up Storybook.

To reach the HTTP server, load [http://localhost:6006](http://localhost:6006)

The command will watch all relevant files for changes.
When a change is detected, it will recompile and rebuild the code automatically.

After you've made some changes, send a PR!

#### What you see in `http://localhost:3000`

`http://localhost:3000` shows a masked input with a phone mask.

You can tweak the code in the `example` folder and reload the page to see the changes.

#### More details about folder structure

The folders in project are:

```bash
|- lib (contains all the code for the library)
|- assets  (contains pictures and other assets required by the project)
|- src (contains the stories for Storybook)
```

#### More help!

If you would like to contribute and need any help to get started, please file an issue.
