const fs = require('fs');
const path = require('path');

const babelTraverse = require('@babel/traverse').default;

const babelRecastGenerate = require('./server/lib/babel-recast-generate');
const parseFiles = require(path.resolve(__dirname, './server/lib/parse-files'));

const globalsTemplate = require('./server/lib/babel-templates/globals-template');
const storyChapterTemplate = require('./server/lib/babel-templates/story-chapter-template');
const storyInstanceTemplate = require('./server/lib/babel-templates/story-instance-template');
const storyImportTemplate = require('./server/lib/babel-templates/story-import-template');
const storyExportTemplate = require('./server/lib/babel-templates/story-export-template');

const inspect = require(path.resolve(__dirname, './server/lib/inspect'));
const logAstToCode = require(path.resolve(__dirname, './server/lib/log-ast-to-code'));


// this probs won't work for packaging...
const outputDir = path.resolve(__dirname, './client/stories');
const storyIndexOutputFile = path.join(outputDir, 'index.js');
const storyIndexExports = [];

parseFiles({
  patterns: path.resolve(__dirname, './components/**/*.story.js'),
}, ({
  ast,
  story: { filePath, name: storyName  },
  files: { total, currentIndex },
}) => {

  const storyOutputFile = path.join(outputDir, `${storyName}.js`);
  const importNames = [];


  // need to keep track of these names so they can be
  // used in a template later
  const importSpecifierVisitor = {
    // in order, each of these looks for:
    // e.g. import _ from 'lodash'
    // e.g. import { Fragment } from 'react'
    // e.g. import * as lo from 'react'
    'ImportDefaultSpecifier|ImportSpecifier|ImportNamespaceSpecifier'(path) {
      const { name } = path.node.local;

      if (name !== 'Story') {
        this.importNames.push(name);
      }
    }
  };

  // need to grab the exported function and turn it
  // into a string. this is also an ideal time to
  // look for any default props
  const chapterFunctionVisitor = {
    FunctionDeclaration(path) {
      if (path.parentPath.isExportNamedDeclaration()) {
        const { node } = path;console.log('found chapter: '+node.id.name)
        const code = babelRecastGenerate(node);
        const defaultPropsExpr = path.parentPath.getNextSibling();
        let props;

        if (defaultPropsExpr.isExpressionStatement()) {
          props = babelRecastGenerate(defaultPropsExpr.node.expression.right);
        }

        const chapter = storyChapterTemplate({
          scope: path.scope.parent,
          title: node.id.name,
          code,
          props,
        });

        path.parentPath.replaceWithMultiple(chapter);
        props && defaultPropsExpr.remove();
      }
    },
  };


  // the following are the entrypoint visitors that
  // inevitably traverse the targeted nodes using
  // the defined visitors above

  // add the import for the Story component at the
  // top of the file, and the export at the end of
  // the file. we do this on exit so the rest of the visitors
  // and processing can take place without any interference
  // from these. plus, unshifting/pushing to a container
  // is an ideal situation for adding code to the top/bottom
  // of the file, respectively.
  const programVisitor = {
    Program: {
      exit(path) {
        const storyImport = storyImportTemplate('lib/story');
        const storyExport = storyExportTemplate();

        path.unshiftContainer('body', storyImport);
        path.pushContainer('body', storyExport);
      }
    }
  };

  const importDeclarationVisitor = {
    ImportDeclaration(path) {
      const nextSibling = path.getNextSibling();
      // console.log(`${path.key}: ${path.type} -> ${nextSibling.type}`)

      // hit these first to build up the import globals
      path.traverse(importSpecifierVisitor, { importNames });

      // now checking for the end of the import declarations so
      // we know where to insert the new code
      if (!nextSibling.isImportDeclaration()) {
        const globalsDeclaration = globalsTemplate(importNames);
        const storyInstantiation = storyInstanceTemplate(storyName);

        path.insertAfter([globalsDeclaration, storyInstantiation]);
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


  fs.writeFileSync(storyOutputFile, babelRecastGenerate(ast));

  storyIndexExports.push(`export { default as ${storyName} } from './${storyName}';`)

  if (currentIndex === total - 1) {
    fs.writeFileSync(storyIndexOutputFile, storyIndexExports.join('\n'));
  }
});
