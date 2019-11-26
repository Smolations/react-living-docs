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


  function importStory(storyName, chapterName) {
    return import(`storybook/stories/${storyName}`)
      .then((storyModule) => {
        const storyInstance = storyModule.default;
        console.log('window.story instance: %o', storyInstance);
        window.story = storyInstance;
        dispatch(setSelectedStory(storyInstance));

        if (chapterName) {
          dispatch(setSelectedChapter(chapterName));
        }
      });
  }


  function handleChapterClick(story, chapter) {
    console.log('[Nav handleChapterClick] story(%o)  chapter(%o)', story, chapter);
    dispatch(setSelectedStory(story));
    dispatch(setSelectedChapter(chapter));
    // if (!selectedStory || selectedStory.id !== storyName) {
    //   importStory(storyName, chapterId);
    // }
  }

  function handleStoryClick(story) {
    // probably just expand/contract chapter list...
    console.log('[Nav handleStoryClick] story: %o', story);
  }


  function renderChapters(story) {
    return story.chapters.map((chapter) => (
      <li key={`${story.id}-${chapter.id}`}>
        <Link to={`${path}${story.id}`}>
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
