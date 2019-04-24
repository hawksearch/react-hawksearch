# Hawksearch React SDK

This repository contains the source code for the Hawksearch React component library. This can be utilized for building rich Hawksearch experiences using modern UI components.

## Builds & Bundles

The Hawksearch React SDK is built into two bundles:

-   Minified JS
-   ES6 Module

### Minified JS

The minified JS is targetted a consumers that need to get up and running quickly by simply including the JS in their page. This bundle also comes with a pre-styled CSS file that contains basic stylings for the search UI components.

Customization can be accomplished via additional CSS styling. For richer customization, use the ES6 Module.

### ES6 Module

The ES6 module build is for consumers with an existing webpack build process. The output of this build is a single ES6 module JS file that can be consumed by Webpack or other modern bundlers.

Various React components are exported by this bundle that can be utilized by consumers. A CSS file is also provided that can additionally be included via a bundler.

## Development

To build the bundles, the following commands can be used:

-   `npm run bundle:min:prod` or `npm run bundle:min:dev` for the minified JS.
-   `npm run bundle:esm:prod` or `npm run bundle:esm:dev` for the ES6 module.
-   `npm run bundle:all:prod` or `npm run bundle:all:dev` for both.

To run a full build (which includes checks, tests, etc):

-   `npm run build:prod` or `npm run build:dev`.

The outputs of these builds will be located in `/dist`

### Checks

Type checking, linting, style checking, tests:

-   `npm run check:lint`
-   `npm run check:types`
-   `npm run check:style`
-   `npm run check:all`
-   `npm run test`
