# babel-preset-es2016-node4

## Install

```sh
$ npm install --save-dev babel-preset-es2016-node4
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["es2016-node4"]
}
```

### Via CLI

```sh
$ babel script.js --presets es2016-node4
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["es2016-node4"]
});
```
