const recast = require('recast');


function babelRecastGenerate(ast, recastGeneratorOpts = {}) {
  const recastOpts = Object.assign({
    // arrowParensAlways: true,
    quote: 'single',
    tabWidth: 2,
    trailingComma: true,
  }, recastGeneratorOpts);

  return recast.print(ast, recastOpts).code;
}


module.exports = babelRecastGenerate;
