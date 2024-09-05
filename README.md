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
