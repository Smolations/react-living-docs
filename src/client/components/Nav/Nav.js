import PropTypes from 'prop-types';
import React from 'react';
import {
  // BrowserRouter as Router,
  // Route,
  Link,
  useRouteMatch,
} from 'react-router-dom';

import { useGlobalStateValue } from 'stores';
import { setSelectedChapter, setSelectedStory } from 'stores/app/actions';

import './Nav.scss';


export default function Nav(props) {
  console.log('[Nav] props: %o', props)
  const { stories } = props;

  const [{
    app: {
      selectedChapter = {},
      selectedStory = {},
    },
  }, dispatch] = useGlobalStateValue();

  const { path } = useRouteMatch();


  function handleChapterClick(story, chapter) {
    console.log('[Nav handleChapterClick] story(%o)  chapter(%o)', story, chapter);
    dispatch(setSelectedStory(story));
    dispatch(setSelectedChapter(chapter));
  }

  function handleStoryClick(story) {
    // probably just expand/contract chapter list...
    console.log('[Nav handleStoryClick] story: %o', story);
  }


  function renderChapters(story) {
    return story.chapters.map((chapter) => (
      <li key={`${story.id}-${chapter.id}`}>
        <Link to={`/stories/${story.id}#${chapter.id}`}>
          {chapter.title}
        </Link>
      </li>
    ));
  }


  return (
    <nav className="Nav">
      <header>
        <h1>Storybook</h1>
      </header>
      <ul>
        {Object.keys(stories).map((storyName, ndx) => (
          <li key={`${storyName}${ndx}`}>
            <a href="#" onClick={() => handleStoryClick(stories[storyName])}>
              <h3>{storyName}</h3>
            </a>
            <ul>
              {renderChapters(stories[storyName])}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}


Nav.propTypes = {
  stories: PropTypes.object.isRequired,
};
