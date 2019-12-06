const babelTemplate = require('@babel/template').default;
const babelTypes = require('@babel/types');
const startCase = require('lodash/startCase');
const camelCase = require('lodash/camelCase');

function storyChapterTemplate({
  scope,
  title,
  props = '{}',
  code,
}) {
  const idLiteral = babelTypes.stringLiteral(title);
  const titleLiteral = babelTypes.stringLiteral(startCase(title));
  const propsId = scope.generateUidIdentifier('chapterProps');
  const chapterId = scope.generateUidIdentifier('chapterCode');

  const tmpl = babelTemplate(`
    const PROPS_UID = \`${props}\`;

    const CHAPTER_UID = \`${code}\`;

    story.addChapter({
      id: ID,
      title: TITLE,
      props: PROPS_UID,
      code: CHAPTER_UID,
    });
  `);

  const astPartial = tmpl({
    ID: idLiteral,
    TITLE: titleLiteral,
    PROPS_UID: propsId,
    CHAPTER_UID: chapterId,
  });


  return astPartial;
}


module.exports = storyChapterTemplate;
