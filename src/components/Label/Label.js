import PropTypes from 'prop-types';
import React from 'react';

import './Label.scss';


const colorClassMap = {
  blue: 'Label--blue',
  green: 'Label--green',
  indigo: 'Label--indigo',
  orange: 'Label--orange',
  red: 'Label--red',
  steel: 'Label--steel',
};


/**
 *  The Label component.
 *
 *  @param {string}  color  Change the color scheme of the label. Supported colors are:
 *                          blue, green, indigo, orange, red, steel.
 *  @param {boolean} ribbon Make the label display as a ribbon, which overlaps the edge
 *                          of it's parent container. The parent container should be
 *                          styled as `position: relative`.
 *  @param {boolean} right  If the `Label` is designated as a `ribbon`, make it hang off
 *                          the right side of the parent container instead of the left.
 *                          NOTE: Be sure the `Label` element is the last child of the
 *                          container in order to render properly.
 */
export default function Label(props) {
  const {
    children,
    color,
    ribbon,
    right,
  } = props;

  // temporary name since .Label is taken
  const classes = ['Label2'];

  if (color && colorClassMap[color]) {
    classes.push(colorClassMap[color]);
  }

  ribbon && classes.push('Label--ribbon');
  right && classes.push('Label--right');

  return (
    <div className={classes.join(' ')}>
      {children}
    </div>
  );
}


Label.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  ribbon: PropTypes.bool,
  right: PropTypes.bool,
};
