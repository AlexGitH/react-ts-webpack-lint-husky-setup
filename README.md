# React Webpack Typescript Eslint Husky Setup

This is an example for React Typescript Webpack Project setup.

## Run

```sh
npm start
```

## Installation

```sh
npm i react react-dom
npm i -D typescript @types/react @types/react-dom
# generate tsconfig.json with default values
npx tsc --init
# configure parameters in tsconfig.json according example in tsconfig-example.json

# install other packages for babel
npm i -D @babel/core @babel
/preset-env @babel/preset-react @babel/preset-typescript
```

Add `.babelrc` configuration file:

```json
{
    "presets": [
        "@babel/preset-env",
        [
            "@babel/preset-react",
            {
                "runtime": "automatic"
            }
        ],
        "@babel/preset-typescript"
    ]
}
```

Install webpack packages and babel-loader:

```sh
npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin
npm i -D babel-loader
```

## Configure a `webpack.config.js`

### Support styles and image loading including SVG and fonts

Install style loaders for css importing:

```sh
npm i -D css-loader style-loader
```

Then add next config into `webpack.config.js` rule section

```js
    //....
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
    //....
```

Add another config to import images:

```js
    //....
    {
      test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
      type: 'asset/resource'
    }
    //....
```

Additional options should be added to webpack for loading SVG and Fonts:

```js
    //....
    {
      test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
      type: 'asset/inline'
    }
    //....
```

Also do not forget to declare types to import modules in `declarations.d.ts`:

```ts
declare module '*.png';
declare module '*.svg';
```

### Separate webpack configuration for Dev and Prod environments

Install `serve` package to test static build for production mode more easy.

```sh
npm i -D serve
```

Also install package to merge webpack configurations.

```sh
npm i -D webpack-merge
```

Go to `webpack` directory.

Rename `webpack.config.js` to `webpack.common.js`.

Remove `mode: 'development'` line from `webpack.common.js`.

Create next files:

- webpack.config.js
- webpack.dev.js
- webpack.prod.js

File `webpack.config.js`:

```js
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = (envVars) => {
  const { env } = envVars;
  const envConfig = require(`./webpack.${env}.js`);
  const config = merge(commonConfig, envConfig);
  return config;
}
```

It uses environmental variable `env` to select appropriate config file.Which should be provided from command line in `start` or `build` scripts from `package.json`. It should look like this:

```json
    "start": "webpack serve --config webpack/webpack.config.js --env env=dev --open --hot",
    "build": "webpack --config webpack/webpack.config.js --env env=prod",
```

Now add next lines to `webpack.dev.js`

```js

const webpack = require('webpack');

module.exports = {
  mode: 'development', // set process.env.NODE_ENV to development
  devtool: 'cheap-module-source-map',
  plugins: [
    // new variable in environment
    new webpack.DefinePlugin({
      // custom environment variable
      // must be used with JSON.stringify to process string properly
      'process.env.name': JSON.stringify('My Dev'),
      // in such way add variable from system environment
      'process.env.TEMP': JSON.stringify(process.env.TEMP)
    })
  ]
}
```

Add these variables into the App component to check the differences in different modes.

Run npm start to run in development mode and make sure that variables are appropriately displayed on the page.

```sh
npm start
```

Use almost the same config for `webpack.prod.js` but set `mode: 'production'` and `devtool: 'source-map'`

Now run `npm run build` to generate static build files.
Than go to the `build` folder and start static web server:

```sh
npm run build
cd build
npx serve
```

### Support react refresh webpack plugin to keep component state

This is useful to refresh only changed components, the other components will not lose their states.

```sh
npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh
```

Add into `webpack.dev.js` :

```js
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
//........

  plugins: [
    //..........
    new ReactRefreshWebpackPlugin()
  ]
```

Now it is possible to change text or styles (see. ClickCounter component)

### Add and configure eslint

Install eslint and related packages.

>NOTE: `eslint` should be installed with all eslint plugins to resolve conflicts properly.

```sh
npm i -D eslint eslint-plugin-react eslint-plugin-react-hooks
```

Install packages for typescript:

```sh
npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Create and inflate `.eslintrc.js` file with appropriate rules and options (see the file content for details).

Create `.eslintignore` and add webpack directory.

```txt
webpack/*
```

Reload IDE window to apply the changes, add unused variable in the App component and make sure to see an eslint error.

Many others plugins can be installed into eslint to improve development experience. For example:

```sh
npm i -D eslint-plugin-import eslint-plugin-jsx-a11y
```

In this case `eslint-plugin-import` used to support import/export in ES6+ syntax and prevent misspelling or file path mistakes. `eslint-plugin-jsx-a11y` adds accessability standards in the app in realtime.

Add next to `extends` section of `.eslintrc.js` file

```js
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended'
  ],
```

Also add `lint` script into `package.json` file.

```json
    "lint": "eslint --fix \"./src/**/*.{js,jsx,ts,tsx,json}\""
```

To check how it works add declare unused variable in the App component and run `npm run lint`. There should be one linting error in the terminal.

### Install and configure prettier

Set up prettier plugin for the IDE( for example in VSCode).

Install prettier packages:

```sh
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

Create `.prettierrc.js` configuration file with the following content:

```js
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  jsxSingleQuote: false,
  printWidth: 80,
  tabWidth: 2,
  endOfLine: 'auto'
}
```

Add next lines into `extends` section of `.eslintrc.js` file:

```js
    //....
    'prettier',
    'plugin:prettier/recommended',
    //....
```

Also create `format` script in the `package.json` to format code in the project easily.

```json
    "format": "prettier --write \"./src/**/*.{js,jsx,ts,tsx,json,css,scss,md}\""
```

Create `.prettierignore` file and add files to avoid format checking.
Something like:

```txt
.eslintrc.js
webpack/*
```

Now run `npm run format` to format code in the application.
Additionally VSCode has ability to configure automatic code formatting on file save.
