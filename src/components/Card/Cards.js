import PropTypes from 'prop-types';
import React from 'react';

import './Cards.scss';


/**
 *  The Cards component.
 *
 *  @param {string} className Additional classes to pass to the wrapper.
 */
export default function Cards(props) {
  const { children, className } = props;

  return (
    <div className={className ? `Cards2 ${className}` : 'Cards2'} data-component="cards">
      {children}
    </div>
  );
}


Cards.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
