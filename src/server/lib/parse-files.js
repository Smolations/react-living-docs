const fs = require('fs');
const glob = require('glob');
const path = require('path');

const babelGenerate = require('@babel/generator').default;
const babelParser = require('@babel/parser');
const babelTemplate = require('@babel/template').default;
const types = require('@babel/types');
const recast = require('recast');

const babelRecast = require('./babel-recast');

const inspect = require('./inspect');
const logAstToCode = require('./log-ast-to-code');
const babelRecastParse = require('./babel-recast-parse');



function parseFiles({
  patterns = [],
  opts: {
    glob: globOpts = {},
    parser = {},
  } = {},
}, callback = () => {}) {
  const filePaths = [];
  let globPatterns = patterns;


  if (!Array.isArray(patterns)) {
    globPatterns = [patterns];
  }

  if (!globPatterns.length) {
    throw new Error('Must provide glob pattern of files to parse!');
  }

  globPatterns.forEach((globPattern) => {
    filePaths.push(...glob.sync(globPattern, globOpts));
  });


  filePaths.forEach((filePath, ndx) => {
    console.log(`READING FILE:  ${filePath}`);
    console.log('------------------------------------------')
    const content = fs.readFileSync(filePath, { encoding: 'UTF-8' });

    // getting info from the file path
    const fileName = path.basename(filePath);
    const storyName = fileName.split('.').shift();

    // grab the ast for the story file
    const ast = babelRecastParse(content);

    callback({
      ast,
      story: { filePath, name: storyName },
      files: { total: filePaths.length, currentIndex: ndx },
    });

    // logAstToCode(ast);

    console.log('\nEOF\n')
  });
}


module.exports = parseFiles;
