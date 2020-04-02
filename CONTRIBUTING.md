# Contributing

Contributions, issues and feature requests are very welcome. If you are using this app and fixed a bug or improved it, please consider submitting a PR!

If you want to contribute, you must read and accept our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Monorepo structure

| package     | Description                                         | Documentation                                    |
| ----------- | --------------------------------------------------- | ------------------------------------------------ |
| `app`       | The web application built with React and Typescript | [app docs](./packages/app/README.md)             |
| `assets`    | All the SVG assets and design files                 | [assets docs](./packages/assets/README.md)       |
| `functions` | Endpoints deployed as Netlify functions             | [functions docs](./packages/functions/README.md) |

## Getting started

First clone the repository and install all dependencies:

```sh
yarn install
```

**It will execute a `postinstall` command copying all SVG files from `assets` package to the `app` and `functions` packages.**

Launch the app:

```sh
yarn start
```

## Guidelines

### General guidelines

- The master branch is the `production` branch.
- All new features / bugs should be done in a dedicated branch from the `master` branch.
- On each PR you will have a preview app deployed on Netlify

### Commit messages

This project uses [gitmoji](https://gitmoji.carloscuesta.me/) as commit convention, because it's fun and provides an easy way of identifying the purpose or intention of a commit with only looking at the emojis used. All you just have to do is to find the emoji corresponding to the purpose of your commit in [this list](https://gitmoji.carloscuesta.me/) following by a short message explaining the update. You can also add a description if it's needed. That's all ;)
