const util = require('util');


function inspect(ast, inspectOpts = { depth: 10, colors: true }) {
  const inspected = util.inspect(ast, inspectOpts);
  console.log(inspected);
}


module.exports = inspect;
