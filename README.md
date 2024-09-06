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
