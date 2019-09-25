const traverse = require('@babel/traverse').default;

const inspect = require('./inspect');


function parseGlobalsFromAst(ast) {
  const globals = [];

  const globalsVisitor = {
    ImportDefaultSpecifier(path) {
      path.traverse({
        Identifier(path) {
          globals.push(path.node.name);
        },
      });
    },

    ImportSpecifier(path) {
      globals.push(path.node.local.name);
    },
  };

  traverse(ast, {
    ImportDeclaration(path) {
      path.traverse(globalsVisitor);
    },
  });

  return globals;
}


module.exports = parseGlobalsFromAst;
