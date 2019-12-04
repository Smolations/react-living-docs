import Story from 'lib/story';
import React from 'react';

import { Card } from './Card';


const globals = {
  React,
  Card,
};

const story = new Story('Label', {
  globals,
});

const _chapterProps = {
  label: 'Totes Labeled',
};

const _chapterCode = `
function LabelInCardHeader(props) {
  return (
    <Card>
      <Card.Head>
        <Label ribbon>{props.label}</Label>
      </Card.Head>

      <Card.Row>
        <p>Sweet header label, eh?</p>
      </Card.Row>
    </Card>
  );
}
`;

story.addChapter({
  id: 'LabelInCardHeader',
  title: 'Label In Card Header',
  props: _chapterProps,
  code: _chapterCode,
});

export default story;
