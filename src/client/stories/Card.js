import Story from 'lib/story';
import _ from 'lodash';
import React from 'react';


const globals = {
  _,
  React,
};

const story = new Story('Card', {
  globals,
});

const _chapterProps = {
  kind: 'awesome',
};

const _chapterCode = `
function EmptyCard(props) {
  const kind = _.camelCase(props.kind);

  return (
    <Card>
      I am an {kind} Card.
    </Card>
  );
}
`;

story.addChapter({
  id: 'EmptyCard',
  title: 'Empty Card',
  props: _chapterProps,
  code: _chapterCode,
});

const _chapterProps2 = {};

const _chapterCode2 = `
function CardWithHeader(props) {
  return (
    <Card>
      <Card.Head>
        I am the card header.
      </Card.Head>

      Otherwise, I am empty.
    </Card>
  );
}
`;

story.addChapter({
  id: 'CardWithHeader',
  title: 'Card With Header',
  props: _chapterProps2,
  code: _chapterCode2,
});

export default story;


