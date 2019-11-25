const path = require('path');
const babelTraverse = require('@babel/traverse').default;
const startCase = require('lodash/startCase');

const parseFiles = require(path.resolve(__dirname, './parse-files'));

// const inspect = require('./inspect');


function parseChaptersFromAst(globPatterns) {
  const stories = [];

  parseFiles({ patterns: globPatterns }, ({ ast, story: { name } }) => {
    const story = { name, chapters: [] };

    const storyFunctionVisitor = {
      FunctionDeclaration(path) {
        this.story.chapters.push(startCase(path.node.id.name));
      },
    };

    const exportDeclarationVisitor = {
      ExportNamedDeclaration(path) {
        path.traverse(storyFunctionVisitor, { story });
      },
    };


    babelTraverse(ast, exportDeclarationVisitor);

    stories.push(story);
  });


  return stories;
}


module.exports = parseChaptersFromAst;
