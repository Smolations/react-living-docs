const babelTemplate = require('@babel/template').default;
const babelTypes = require('@babel/types');


function storyImportTemplate(importPath) {
  const importPathLiteral = babelTypes.stringLiteral(importPath);

  const tmpl = babelTemplate(`
    import Story from '${importPath}';
  `);

  const astPartial = tmpl();

  return astPartial;
}


module.exports = storyImportTemplate;
