module.exports = {
  "extends": [
    "airbnb-base",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint", // biggest win here is supporting static class property syntax
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
  },
  "plugins": [
    "babel",
    "import",
    "react",
    "react-hooks",
    "jsx-a11y"
  ],
  "globals": {},
  "rules": {
    "camelcase": ["error", {
      "properties": "never",
      "ignoreDestructuring": true // we often use values from api calls in snake_case, but shouldn't long-term
    }],
    "class-methods-use-this": "off",
    "jsx-quotes": ["error", "prefer-double"],
    "max-len": ["error", {
      "code": 120
    }],
    "no-restricted-syntax": ["off", "ForOfExpression"],
    "no-underscore-dangle": "off",
    "no-unused-expressions": ["warn", {
      "allowShortCircuit": true,
      "allowTernary": true,
    }],
    "object-curly-newline": ["error", {
      "multiline": true,
      "minProperties": 3,
      "consistent": true
    }],
    "react/default-props-match-prop-types": [2, { // 0 = off, 1 = warn, 2 = error
      "allowRequiredDefaults": true,
    }],
    "react/display-name": ["off"], // this would throw in unwanted situations...
    "react/jsx-handler-names": "error",
    "react/jsx-indent": [2, 2, {
      checkAttributes: true,
      indentLogicalExpressions: true,
    }],
    "react/jsx-indent-props": [2, 2],
    "react/jsx-max-props-per-line": [2, { // 0 = off, 1 = warn, 2 = error
      "when": "multiline",
    }],
    "react/jsx-pascal-case": [2], // 0 = off, 1 = warn, 2 = error
    "react/jsx-props-no-multi-spaces": "error",
    "react/jsx-sort-default-props": [2], // 0 = off, 1 = warn, 2 = error; i wish callbacksLast were an option!
    "react/jsx-tag-spacing": [2, { // 0 = off, 1 = warn, 2 = error
      "beforeClosing": "never",
    }],
    "react/jsx-wrap-multilines": [2, { // 0 = off, 1 = warn, 2 = error
      "declaration": "parens-new-line",
      "assignment": "parens-new-line",
      "return": "parens-new-line",
      "arrow": "parens-new-line",
      "condition": "parens-new-line",
      "logical": "parens-new-line",
      "prop": "parens-new-line",
    }],
    "react/no-unused-prop-types": [2], // 0 = off, 1 = warn, 2 = error
    "react/sort-prop-types": [2, { // 0 = off, 1 = warn, 2 = error
      "callbacksLast": true,
      "sortShapeProp": true,
    }],
    "react-hooks/rules-of-hooks": "error",


    // these are definitely worth considering in the future, but
    // may/will take considerable refactor time.
    // "react/jsx-props-no-spreading": [{
    //     "html": "ignore" / "enforce",
    //     "custom": "ignore" / "enforce",
    //     "exceptions": [<string>]
    // }],
    // "react/no-multi-comp": [<enabled>, { "ignoreStateless": <boolean> }],
    // "react/require-default-props": [<enabled>, { forbidDefaultForRequired: <boolean> }],
    // "react/no-unescaped-entities": ["error", {"forbid": [{
    //   char: ">",
    //   alternatives: ['&gt;']
    // }, {
    //   char: "}",
    //   alternatives: ['&#125;']
    // }]}],

    // this is experimental and currently is flagging things
    // that are causing some issues, so we'll turn it off for now.
    // "react-hooks/exhaustive-deps": "warn"
  },
  "overrides": [
    {
      "files": ["*.conf.js", "*.config.js", "*.test.js", "*.jest.js"],
      "env": {
        "jest": true,
        "mocha": true,
        "node": true,
      },
      "rules": {
        // a bit confusing as the error is thrown if option is `false`
        "import/no-extraneous-dependencies": ["error", {
          "devDependencies": true,
          "optionalDependencies": false,
          "peerDependencies": false
        }],
        "prefer-arrow-callback": "off",
        "func-names": "off",
      },
    },
  ],
  "settings": {
    // this allows module aliases from the webpack config to
    // be respected (e.g. import Snappy from 'snappy')
    // https://www.npmjs.com/package/eslint-import-resolver-webpack
    "import/resolver": {
      webpack: {
        config: "webpack-dev.config.js",
      },
    },
    // https://github.com/yannickcr/eslint-plugin-react#configuration
    "react": {
      // "createClass": "createReactClass", // Regex for Component Factory to use,
                                         // default to "createReactClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "detect", // React version. "detect" automatically picks the version you have installed.
                           // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                           // default to latest and warns if missing
                           // It will default to "detect" in the future
      // "flowVersion": "0.53" // Flow version
    },
    "propWrapperFunctions": [
        // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`.
        // If this isn't set, any propTypes wrapped in a function will be skipped.
        "forbidExtraProps",
        // {"property": "freeze", "object": "Object"},
        // {"property": "myFavoriteWrapper"}
    ],
    "linkComponents": [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      // "Hyperlink",
      // {"name": "Link", "linkAttribute": "to"}
    ]
  }
};
