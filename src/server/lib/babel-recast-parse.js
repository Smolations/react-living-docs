const recast = require('recast');


const defaultBabelParserOpts = {
  sourceType: 'module',
  plugins: [
    'jsx',
  ],
};


function babelRecastParse(code, recastParserOpts = {}, babelParserOpts = {}) {
  const babelOpts = Object.assign(defaultBabelParserOpts, babelParserOpts);
  const recastOpts = Object.assign({
    parser: {
      parse(source) {
        return require('recast/parsers/babel').parse(source, babelOpts);
      },
    },
  }, recastParserOpts);

  return recast.parse(code, recastOpts);
}


module.exports = babelRecastParse;
