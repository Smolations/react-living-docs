const babelTemplate = require('@babel/template').default;
const babelTraverse = require('@babel/traverse').default;
const babelTypes = require('@babel/types');

const globalsTemplate = require('./babel-templates/globals-template');
const storyChapterTemplate = require('./babel-templates/story-chapter-template');
const storyInstanceTemplate = require('./babel-templates/story-instance-template');
const babelRecastGenerate = require('./babel-recast-generate');

const inspect = require('./inspect');
const logAstToCode = require('./log-ast-to-code');


function parseStoriesFromAst(ast, storyName) {
  const chapterFunctions = [];
  const chapterNames = [];

  const imports = [];
  const importNames = [];

  const importSpecifierFn = (path) => {
    importNames.push(path.node.local.name);
  };

  // need to keep track of these names so they can be
  // used in a template later
  const importSpecifierVisitor = {
    // e.g. import _ from 'lodash'
    ImportDefaultSpecifier: importSpecifierFn,

    // e.g. import { Fragment } from 'react'
    ImportSpecifier: importSpecifierFn,

    // e.g. import * as lo from 'react'
    ImportNamespaceSpecifier: importSpecifierFn,
  };

  // need to grab the exported function and turn it
  // into a string. this is also an ideal time to
  // look for any default props
  const chapterFunctionVisitor = {
    FunctionDeclaration(path) {
      if (path.parentPath.isExportNamedDeclaration()) {
        const { node } = path;
        const code = babelRecastGenerate(node);
        const defaultPropsExpr = path.parentPath.getNextSibling();
        let defaultPropsObjExpr;

        if (defaultPropsExpr.isExpressionStatement()) {
          defaultPropsObjExpr = defaultPropsExpr.node.expression.right;
        }

        const chapter = storyChapterTemplate({
          scope: path.scope.parent,
          title: node.id.name,
          props: defaultPropsObjExpr,
          code,
        });

        path.parentPath.replaceWithMultiple(chapter);
        defaultPropsExpr.remove();
      }

      // chapterFunctions.push(path.node);
      // chapterNames.push(path.node.id.name);
    },
  };


  // the following are the entrypoint visitors that
  // inevitably traverse the targeted nodes using
  // the defined visitors above

  // add the import for the Story component at the
  // top of the file
  const programVisitor = {
    Program(path) {
      const storyImport = babelTemplate`
        import Story from 'storybook/lib/story';
      `;

      path.unshiftContainer('body', storyImport());
    }
  };

  const importDeclarationVisitor = {
    ImportDeclaration(path) {
      const nextSibling = path.getNextSibling();
      // console.log(`${path.key}: ${path.type} -> ${nextSibling.type}`)

      // we inserted a new import at the top of the code
      // so there's no need to do any further parsing for
      // those import indentifiers
      if (path.key > 0) {
        path.traverse(importSpecifierVisitor);

        if (!nextSibling.isImportDeclaration()) {
          const globalsDeclaration = globalsTemplate(importNames);
          const storyInstantiation = storyInstanceTemplate(storyName);

          path.insertAfter([globalsDeclaration, storyInstantiation]);
        }
      }
    },
  };

  const exportDeclarationVisitor = {
    ExportNamedDeclaration(path) {
      path.traverse(chapterFunctionVisitor);
    },
  };

  // onyourmarkgetsetgo!
  babelTraverse(ast, Object.assign(
    {},
    programVisitor,
    importDeclarationVisitor,
    exportDeclarationVisitor,
  ));


  return {
    imports,
    importNames,

    chapterFunctions,
    chapterNames,
  };
}


module.exports = parseStoriesFromAst;
