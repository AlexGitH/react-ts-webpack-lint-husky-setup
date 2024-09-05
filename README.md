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

Configure a `webpack.config.js`
