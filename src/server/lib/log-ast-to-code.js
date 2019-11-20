const babelRecastGenerate = require('./babel-recast-generate');


function logAstToCode(ast) {
  const code = babelRecastGenerate(ast);
  console.log(`\n[logAstToCode ${ast.type}]:\n${code}`);
}


module.exports = logAstToCode;
