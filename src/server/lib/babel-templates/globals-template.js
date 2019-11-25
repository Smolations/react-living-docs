const babelTemplate = require('@babel/template').default;
const babelTypes = require('@babel/types');

const inspect = require('../inspect');


function globalsTemplate(globals = []) {
  const objectProperties = globals.map((globalId) => {
    const globalIdentifier = babelTypes.identifier(globalId);

    return babelTypes.objectProperty(
      globalIdentifier,
      globalIdentifier,
      false, // computed?
      true,  // shorthand?
    );
  });

  const objectExpression = babelTypes.objectExpression(objectProperties);

  const globalsTmpl = babelTemplate(`
    const globals = OBJ_EXPRESSION;
  `);

  const globalsAstPartial = globalsTmpl({
    OBJ_EXPRESSION: objectExpression,
  });

  return globalsAstPartial;
}


module.exports = globalsTemplate;
