const babelTemplate = require('@babel/template').default;
const babelTypes = require('@babel/types');


function storyInstanceTemplate(storyName) {
  const storyNameLiteral = babelTypes.stringLiteral(storyName);

  const tmpl = babelTemplate(`
    const story = new Story(STORY_NAME, { globals });
  `);

  const astPartial = tmpl({
    STORY_NAME: storyNameLiteral,
  });

  return astPartial;
}


module.exports = storyInstanceTemplate;
