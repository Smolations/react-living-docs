import PropTypes from 'prop-types';
import React from 'react';

import './CardRow.scss';


/**
 *  The CardRow component.
 *
 *  @param {string}  className Additional classes to pass to the wrapper.
 *  @param {boolean} empty     Adds a class to signify the row is empty?
 *  @param {boolean} soft      Adds a class to soften the look of the card row.
 */
export default function CardRow(props) {
  const {
    children,
    className,
    empty,
    soft,
  } = props;

  const classes = ['CardRow'];

  className && classes.push(...className.split(' '));
  soft && classes.push('CardRow--soft');
  empty && classes.push('CardRow--empty');


  return (
    <div className={classes.join(' ')}>
      {children}
    </div>
  );
}


CardRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  empty: PropTypes.bool,
  soft: PropTypes.bool,
};
