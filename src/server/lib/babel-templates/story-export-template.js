const babelTemplate = require('@babel/template').default;
const babelTypes = require('@babel/types');


function storyExportTemplate() {
  const tmpl = babelTemplate(`
    export default story;
  `);

  const astPartial = tmpl();

  return astPartial;
}


module.exports = storyExportTemplate;
