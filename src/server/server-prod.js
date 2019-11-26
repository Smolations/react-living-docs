import path from 'path';
import express from 'express';

// keep in mind this file gets transpiled and tossed
// into the dist folder along with server.js
const PORT = process.env.PORT || 8080
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const app = express();


app.use(express.static(DIST_DIR));


app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
});


app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
})
