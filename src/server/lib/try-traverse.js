const traverse = require('@babel/traverse').default;

const inspect = require('./inspect');


function tryTraverse(ast) {
  const globals = [];

  // const globalsVisitor = {
  //   ImportDefaultSpecifier(path) {
  //     path.traverse({
  //       Identifier(path) {
  //         globals.push(path.node.name);
  //       },
  //     });
  //   },

  //   ImportSpecifier(path) {
  //     globals.push(path.node.local.name);
  //   },
  // };

  const visitor = {
    ReturnStatement(path) {
      inspect(path.node);
    }
  };

  traverse(ast, visitor);
}


module.exports = tryTraverse;
