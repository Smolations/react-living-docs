const babelGenerate = require('@babel/generator').default;
const babelTemplate = require('@babel/template').default;
const babelTypes = require('@babel/types');
const path = require('path');

const parseFiles = require(path.resolve(__dirname, './server/lib/parse-files'));
const parseChaptersFromAst = require(path.resolve(__dirname, './server/lib/parse-chapters-from-ast'));
const parseGlobalsFromAst = require(path.resolve(__dirname, './server/lib/parse-globals-from-ast'));
const parseStoriesFromAst = require(path.resolve(__dirname, './server/lib/parse-stories-from-ast'));


const inspect = require(path.resolve(__dirname, './server/lib/inspect'));
const logAstToCode = require(path.resolve(__dirname, './server/lib/log-ast-to-code'));


const parserOpts = {
  sourceType: 'module',
  plugins: [
    'jsx',
  ],
};


parseFiles({
  patterns: path.resolve(__dirname, './components/**/*.story.js'),
}, ({ ast, story: { filePath, name  } }) => {
  // grabbing the globals required to make the story work
  // const globals = parseGlobalsFromAst(ast);
  parseStoriesFromAst(ast, name);


  // const generatorOpts = {
  //   generator: 'recast',
  //   retainFunctionParens: true,
  //   retainLines: true,
  // };
  // console.log(babelGenerate(ast, generatorOpts).code);
});
