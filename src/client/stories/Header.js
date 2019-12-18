import Story from 'lib/story';
import React from 'react';


const globals = {
  React,
};

const story = new Story('Header', {
  globals,
});

const _chapterProps = `{}`;

const _chapterCode = `function SimpleHeaders(props) {
  return (
    <React.Fragment>
      <Header title="I'm an h1!" />
      <Header size={2} title="I'm an h2!" />
      <Header size={3} title="I'm an h3!" />
      <Header size={4} title="I'm an h4!" />
      <Header size={5} title="I'm an h5!" />
      <Header size={6} title="I'm an h6!" />
    </React.Fragment>
  );
}`;

story.addChapter({
  id: 'SimpleHeaders',
  title: 'Simple Headers',
  props: _chapterProps,
  code: _chapterCode,
});

const _chapterProps2 = `{}`;

const _chapterCode2 = `function HeadersWithIcon(props) {
  return (
    <React.Fragment>
      <Header icon="graph" title="h1. Graphs are purty..." />
      <Header icon="control_panel" size={2} title="h2. I can has controls" />
      <Header icon="users" size={3} title="h3. Users really grind my gears!" />
      <Header icon="settings" size={4} title="h4. What happens if I flip this switch?" />
      <Header icon="lock" size={5} title="h5. This is forbidden!" />
      <Header icon="calendar" size={6} title="h6. Crap, late for an appt!" />
    </React.Fragment>
  );
}`;

story.addChapter({
  id: 'HeadersWithIcon',
  title: 'Headers With Icon',
  props: _chapterProps2,
  code: _chapterCode2,
});

const _chapterProps3 = `{}`;

const _chapterCode3 = `function HeaderWithAction(props) {
  return (
    <Header size={3} title="I'm an h3!" />
  );
}`;

story.addChapter({
  id: 'HeaderWithAction',
  title: 'Header With Action',
  props: _chapterProps3,
  code: _chapterCode3,
});

const _chapterProps4 = `{}`;

const _chapterCode4 = `function HeaderKitchenSink(props) {
  return (
    <Header size={3} title="I'm an h3!" />
  );
}`;

story.addChapter({
  id: 'HeaderKitchenSink',
  title: 'Header Kitchen Sink',
  props: _chapterProps4,
  code: _chapterCode4,
});

export default story;
