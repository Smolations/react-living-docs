const babel = require('@babel/core');
const babelParser = require('@babel/parser');
const recast = require('recast');


function setAst(babel, { ast }) {
  return {
    visitor: {
      Program(path) {
        path.replaceWith(ast.program);
      }
    }
  };
}


function babelRecast(code, parserOpts, transformerOpts = {}) {
  const ast = recast.parse(code, {
    parser: require('recast/parsers/babel'),
  });

  const opts = Object.assign(
    {
      ast: true,
      code: false
    },
    transformerOpts,
    {
      plugins: [
        // For some reason, recast doesn't work with transformFromAst.
        // Use this hack instead.
        [setAst, { ast }]
      ].concat(transformerOpts.plugins || [])
    }
  );

  const output = babel.transform('', opts);

  return recast.print(output.ast).code;
}


module.exports = babelRecast;
