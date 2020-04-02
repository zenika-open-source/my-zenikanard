# Assets

Assets files are copied to `app` and `functions` packages by the npm `postinstall` hook.

## Commands

| Command        | Description                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------- |
| optimize       | Optimize all SVG file in `icons` and `shapes` folder with [`svgo`](https://github.com/svg/svgo) |
| generate       | Generate a javascript file exporting of all SVG files as React components (used in webapp)      |
| copy:app       | Copy all assets and generated js files in the `app` package                                     |
| copy:functions | Copy all assets and generated js files in the `functions` package                               |
| add:asset      | Must be executed when new assets are added in `shapes` and `icons` folders                      |

## Package strucure

```
packages/assets
├── design           # Contains all designs as `Affinity Designer` format
├── generate.js      # Node script used to generate `src/index.js`
└── src
    ├── icons        # Contains all icons in svg format
    ├── shapes       # Contains all shapes in svg format
    ├── index.js     # Generated file exporting of all SVG files as React components
    └── layers.json  # Order and name of the different `Duck` layers
```
