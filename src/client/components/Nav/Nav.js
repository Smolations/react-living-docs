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

import { Typeahead } from '../Typeahead';


import './Nav.scss';


export default function Nav(props) {
  console.log('[Nav] props: %o', props)
  const { stories } = props;

  const [{
    app: {
      isInitialState,
      selectedChapter,
      selectedStory,
    },
  }, dispatch] = useGlobalStateValue();
  console.log('[Nav] isInitialState: %o', isInitialState)

  const { path } = useRouteMatch();

  const storyKeys = Object.keys(stories);
  const storyValues = Object.values(stories);
  let chapterValues = [];

  if (selectedStory) {
    chapterValues = Object.values(selectedStory.chapters);
  }


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


  // we want the typeaheads to render with the correct default
  // story, so we need to wait until it updates when the state's
  // `selectedStory` is set based on the url. if it's not in the
  // url, we can safely render without the default story.
  return (
    <nav className="Nav">
      {(!isInitialState || true) && (
        <Typeahead
          collection={storyValues}
          filterCollection={(inputValue, story) => !inputValue || story.id.includes(inputValue)}
          resultToString={story => story && story.id}
          resultKey={(story, index) => story.id}
          renderResult={(story, index) => (
            <Link to={`/stories/${story.id}#${story.chapters[0].id}`}>
              <p>{story.id}</p>
            </Link>
          )}
          placeholder="StoryName"
          selectedResult={selectedStory || null}
        />
      )}

      {selectedStory && (
        <Typeahead
          collection={chapterValues}
          filterCollection={(inputValue, chapter) => !inputValue || chapter.title.includes(inputValue)}
          resultToString={chapter => chapter && chapter.title}
          resultKey={(chapter, index) => chapter.id}
          renderResult={(chapter, index) => (
            <Link to={`/stories/${selectedStory.id}#${chapter.id}`}>
              <p>{chapter.title}</p>
            </Link>
          )}
          placeholder="Chapter"
          selectedResult={selectedChapter}
        />
      )}
    </nav>
  );
}


Nav.propTypes = {
  stories: PropTypes.object.isRequired,
};
