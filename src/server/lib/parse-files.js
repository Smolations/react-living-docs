const fs = require('fs');
const glob = require('glob');
const path = require('path');

const babelGenerate = require('@babel/generator').default;
const babelParser = require('@babel/parser');
const babelTemplate = require('@babel/template').default;
const types = require('@babel/types');

const babelRecast = require('./babel-recast');
const inspect = require('./inspect');
const tryTraverse = require('./try-traverse');
const parseGlobalsFromAst = require('./parse-globals-from-ast.js');



function parseFiles(patterns = [], globOpts = {}) {
  const filePaths = [];
  const parserOpts = {
    sourceType: 'module',
    plugins: [
      'jsx',
    ],
  };
  let globPatterns = patterns;

  if (!Array.isArray(patterns)) {
    globPatterns = [patterns];
  }

  if (!globPatterns.length) {
    throw new Error('Must provide glob pattern of files to parse!');
  }

  globPatterns.forEach((globPattern) => {
    filePaths.push(...glob.sync(globPattern, globOpts))
  });

  console.log('--------------- File Paths ---------------\n', filePaths, '\n------------------------------------------\n\n');

  filePaths.forEach((filePath) => {
    console.log(`READING FILE:  ${filePath}`);
    console.log('------------------------------------------')

    fs.readFile(filePath, { encoding: 'UTF-8' }, (err, content) => {
      if (err) {
        throw err;
      }

      const fileName = path.basename(filePath);
      const storyName = fileName.split('.').unshift();

      console.log(babelRecast(content, parserOpts));

      const ast = babelParser.parse(content, parserOpts);

      const globals = parseGlobalsFromAst(ast);
      const globalIdentifiers = globals.reduce((ids, id) => {
        ids.push(types.identifier(id));
        return ids;
      }, []);

      const addGlobals = babelTemplate`
        const globals = GLOBALS;
      `;
      const globalsAst = addGlobals({
        GLOBALS: types.arrayExpression(globalIdentifiers),
      });


      // tryTraverse(ast);


      const generatorOpts = {
        retainFunctionParens: true,
        retainLines: true,
      };
      // console.log(babelGenerate(ast, generatorOpts).code);
    });
  });

}


module.exports = parseFiles;
