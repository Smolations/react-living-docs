import { transform } from '@babel/core';
import path from 'path';
import express from 'express';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackDevConfig from '../../webpack-dev.config.js'


// keep in mind this file gets transpiled and tossed
// into the dist folder along with server.js
const PORT = process.env.PORT || 8080
// const DIST_DIR = __dirname;
const DIST_DIR = path.join(__dirname, '../../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const babelrcPath = path.resolve(__dirname, '../../.babelrc');

const app = express();
const compiler = webpack(webpackDevConfig);


app.use(express.json());

app.use(webpackDevMiddleware(compiler, {
  lazy: false,
  publicPath: webpackDevConfig.output.publicPath,
  // headers: { 'Access-Control-Allow-Origin': '*' },
}));

app.use(
  webpackHotMiddleware(compiler, {
    // path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
    // noInfo: false,
    quiet: false,
  })
);


app.post('/process', (req, res) => {
  console.log(`(/process) REQUEST: ${req.path}`)
  console.log(Object.keys(req))
  const { body: { jsx } } = req;
  console.log('\nJSX:\n', jsx);

  const trimmedJsx = jsx.trim();
  const transformOpts = {
    configFile: babelrcPath,
  };

  const transpiled = transform(trimmedJsx, transformOpts);
  const code = transpiled.code.replace(/"use strict";\n*/, '').trim();
  console.log('\nTRANSPILED:\n', code);

  return res.send({ transpiledJsx: code });
})

app.get('*', (req, res, next) => {
  console.log(`(*) REQUEST: ${req.path}`);

  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    if (err) {
      return next(err);
    }
    console.log('RESULT:\n'+result)
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  })
});


app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
});
