import PropTypes from 'prop-types';
import React from 'react';

import './CardCol.scss';


/**
 *  The CardCol component.
 *
 *  @param {string}  className Additional classes to pass to the wrapper.
 *  @param {string}  grow      Adds a class to signify the row is empty?
 *  @param {boolean} min       Adds a class that resets flex settings.
 *  @param {boolean} soft      Adds a class to soften the look of the card row.
 */
export default function CardCol(props) {
  const {
    children,
    className,
    grow,
    min,
    soft,
  } = props;

  const classes = ['CardCol'];

  className && classes.push(...className.split(' '));
  grow && classes.push(`u-flexGrow ${grow}`);
  min && classes.push('Col--min'); // don't even ask...it _will_ be rectified
  soft && classes.push('CardCol--soft');


  return (
    <div className={classes.join(' ')}>
      {children}
    </div>
  );
}


CardCol.propTypes = {
  children: PropTypes.node, // should be required, but we'll wait until Card is flexed
  className: PropTypes.bool,
  grow: PropTypes.string,
  min: PropTypes.bool,
  soft: PropTypes.bool,
};
