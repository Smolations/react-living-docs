const Babel = require('@babel/core');
const cors = require('cors');
const express = require('express');
const path = require('path');

const parseFiles = require(path.resolve(__dirname, './lib/parse-files'));

// these would probably be passed as some sort of config...
const babelrcPath = path.resolve(__dirname, '../../.babelrc');
const port = 8080;
const stories = parseFiles({
  patterns: path.resolve(__dirname, '../components/**/*.story.js'),
});


const app = express();


function handleProcessRequest(req, resp) {
  const { body: { jsx } } = req;
  console.log('\nJSX:\n', jsx);

  const trimmedJsx = jsx.trim();
  const transformOpts = {
    configFile: babelrcPath,
  };

  const transpiled = Babel.transform(trimmedJsx, transformOpts);
  const code = transpiled.code.replace(/"use strict";\n*/, '').trim();
  console.log('\nTRANSPILED:\n', code);

  return resp.send({ transpiledJsx: code });
}

function handleStoriesRequest(req, resp) {
  return resp.send({ stories });
}


app.use(cors());
app.use(express.json());

/** ROUTES **/
app.get('/stories', handleStoriesRequest);

app.post('/process', handleProcessRequest);

app.listen(port, () => console.log(`Storybook server listening on port ${port}!`));
