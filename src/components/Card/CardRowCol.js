import PropTypes from 'prop-types';
import React from 'react';

import CardCol from './CardCol';
import CardRow from './CardRow';


/**
 *  The CardRowCol component.
 *
 *  @param {boolean} empty Adds a class to signify the row is empty?
 *  @param {boolean} half  Adds a class to limit the dimensions of the row?
 *  @param {boolean} soft  Adds a class to soften the look of the card row?
 */
export default function CardRowCol(props) {
  const {
    children,
    empty,
    half,
    soft,
    ...other // how to document?
  } = props;

  const contents = [React.createElement(CardCol, { ...other, key: 0 }, children)];

  half && contents.push(React.createElement(CardCol, { soft: true, key: 1 }));

  return React.createElement(CardRow, { soft, empty }, contents);
}


CardRowCol.propTypes = {
  children: PropTypes.node.isRequired,
  empty: PropTypes.bool,
  half: PropTypes.bool,
  soft: PropTypes.bool,
};
