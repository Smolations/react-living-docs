const babelTemplate = require('@babel/template').default;
const babelTypes = require('@babel/types');
const startCase = require('lodash/startCase');
const camelCase = require('lodash/camelCase');

function storyChapterTemplate({
  scope,
  title,
  props,
  code,
}) {
  const titleLiteral = babelTypes.stringLiteral(startCase(title));
  const propsId = scope.generateUidIdentifier('chapterProps');
  const chapterId = scope.generateUidIdentifier('chapterCode');
  let propsObjExpr = props;

  if (!props) {
    propsObjExpr = babelTypes.objectExpression([]);
  }

  const tmpl = babelTemplate(`
    const PROPS_UID = PROPS;

    const CHAPTER_UID = \`\n${code}\n\`;

    story.addChapter({
      title: TITLE,
      props: PROPS_UID,
      code: CHAPTER_UID,
    });
  `);

  const astPartial = tmpl({
    TITLE: titleLiteral,
    PROPS_UID: propsId,
    PROPS: propsObjExpr,
    CHAPTER_UID: chapterId,
  });


  return astPartial;
}


module.exports = storyChapterTemplate;
