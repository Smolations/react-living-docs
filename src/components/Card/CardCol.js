import PropTypes from 'prop-types';
import React from 'react';

import { Flex, pickFlexProps } from '../Flex';

import './CardCol.scss';


/**
 *  The CardCol component.
 *
 *  @param {string}  className Additional classes to pass to the wrapper.
 *  @param {string}  grow      Adds a class to signify the row is empty?
 *  @param {boolean} slim      Adds a class that changes the vertical padding.
 *  @param {boolean} soft      Adds a class to soften the look of the card row.
 */
export default function CardCol(props) {
  const {
    children,
    className,
    dangling,
    slim,
    soft,
  } = props;

  const classes = ['CardCol'];
  const { flexItemProps } = pickFlexProps(props);

  className && classes.push(...className.split(' '));
  slim && classes.push('CardCol--slim');
  soft && classes.push('CardCol--soft');
  dangling && classes.push('CardCol--dangling');


  return (
    <Flex.Item
      className={classes.join(' ')}
      {...flexItemProps}
    >
      {children}
    </Flex.Item>
  );
}


CardCol.displayName = 'CardCol';

CardCol.propTypes = {
  children: PropTypes.node, // should be required, but we'll wait until Card is flexed
  className: PropTypes.string,
  dangling: PropTypes.bool,
  slim: PropTypes.bool,
  soft: PropTypes.bool,
  ...Flex.Item.flexPropTypes,
};

CardCol.defaultProps = {
  dangling: false,
  slim: false,
  soft: false,
};
