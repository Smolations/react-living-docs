import PropTypes from 'prop-types';
import React from 'react';

import './Nav.scss';


export default function Nav(props) {
  const { stories } = props;


  function renderChapters(story) {
    return story.chapters.map(({ label }) => (
      <li>
        {label}
      </li>
    ));
  }


  return (
    <nav className="Nav">
      <header>
        <h1>Storybook</h1>
      </header>
      <ul>
        {stories.map(story => (
          <li>
            <h3>{story.id}</h3>
            <ul>
              {renderChapters(story)}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}


Nav.propTypes = {
  stories: PropTypes.array.isRequired,
};
