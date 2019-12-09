import PropTypes from 'prop-types';
import React from 'react';

import { Flex, pickFlexProps } from '../Flex';

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
    cols,
    empty,
    soft,
  } = props;

  const classes = ['CardRow'];
  const { flexContainerProps, flexItemProps } = pickFlexProps(props);


  className && classes.push(...className.split(' '));
  soft && classes.push('CardRow--soft');
  empty && classes.push('CardRow--empty');


  return (
    <Flex
      className={classes.join(' ')}
      cols={cols}
      {...flexContainerProps}
      {...flexItemProps}
    >
      {children}
    </Flex>
  );
}


CardRow.displayName = 'CardRow';

CardRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  cols: PropTypes.number,
  empty: PropTypes.bool,
  soft: PropTypes.bool,
  ...Flex.flexPropTypes,
};

CardRow.defaultProps = {
  empty: false,
  soft: false,
};
