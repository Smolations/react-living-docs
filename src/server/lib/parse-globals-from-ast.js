const traverse = require('@babel/traverse').default;

const inspect = require('./inspect');


function parseGlobalsFromAst(ast) {
  const globals = [];

  const globalsVisitor = {
    // e.g. import _ from 'lodash'
    ImportDefaultSpecifier(path) {
      path.traverse({
        Identifier(path) {
          globals.push(path.node.name);
        },
      });
    },

    // e.g. import { Fragment } from 'react'
    ImportSpecifier(path) {
      globals.push(path.node.local.name);
    },

    // e.g. import * as lo from 'react'
    ImportNamespaceSpecifier(path) {
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
