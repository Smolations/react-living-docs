const Babel = require('@babel/core');
const cors = require('cors');
const express = require('express');
const path = require('path');

const parseFiles = require(path.resolve(__dirname, './lib/parse-files'));

parseFiles(path.resolve(__dirname, '../components/**/*.story.js'));

const app = express();
const port = 8080;


function handleProcessRequest(req, resp) {
  const { body: { jsx } } = req;
  console.log('\nJSX:\n', jsx);

  const trimmedJsx = jsx.trim();
  const transformOpts = {
    configFile: path.resolve(__dirname, '../../.babelrc'),
  };

  const transpiled = Babel.transform(trimmedJsx, transformOpts);
  const code = transpiled.code.replace(/"use strict";\n*/, '').trim();;
  console.log('\nTRANSPILED:\n', code);

  return resp.send({ transpiledJsx: code });
}


app.use(cors());
app.use(express.json());

app.post('/process', handleProcessRequest);

// app.listen(port, () => console.log(`Storybook server listening on port ${port}!`));
