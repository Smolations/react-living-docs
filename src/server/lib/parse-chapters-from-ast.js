const traverse = require('@babel/traverse').default;
const recast = require('recast');

const inspect = require('./inspect');


function importsVisitorFn(path) {
  this.importIdentifiers.push(path.node.local.name);
}

const importsVisitor = {
  // e.g. import _ from 'lodash'
  ImportDefaultSpecifier: importsVisitorFn,

  // e.g. import { Fragment } from 'react'
  ImportSpecifier: importsVisitorFn,

  // e.g. import * as lo from 'react'
  ImportNamespaceSpecifier: importsVisitorFn,
};




const storyFunctionVisitor = {
  FunctionDeclaration(path) {
    this.chapters.push(path.node.id.name);
  },
};



function parseChaptersFromAst(ast) {
  const state = {
    chapters: [],
    imports: [],
    importIdentifiers: [],
  };

  const importExportVisitor = {
    ImportDeclaration(path) {
      // astToCode(path.node);
      state.imports.push(recast.print(path.node).code);

      path.traverse(importsVisitor, state);
    },

    ExportNamedDeclaration(path) {
      path.traverse(storyFunctionVisitor, state);
    },
  };


  traverse(ast, importExportVisitor, state);
  // traverse(ast, exportVisitor, state);

  return state;
}


module.exports = parseChaptersFromAst;
