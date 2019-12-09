import PropTypes from 'prop-types';
import React from 'react';

import { Flex } from '../Flex';

import './Card.scss';


/**
 *  The Card component.
 *
 *  @param {string}  className Additional classes to pass to the wrapper.
 *  @param {string}  dataGroup Value to be assigned to the `data-group` attribute.
 *  @param {string}  dataIndex Value to be assigned to the `data-index` attribute.
 *  @param {string}  dataType  Value to be assigned to the `data-type` attribute.
 *  @param {boolean} secondary When `true`, de-emphasizes styling of the card.
 */
export default function Card(props) {
  const {
    children,
    className,
    dataGroup,
    dataIndex,
    dataType,
    secondary,
    wide,
  } = props;

  // temporary name since .Card is taken
  const classes = ['Card2'];

  className && classes.push(...className.split(' '));
  secondary && classes.push('Card--secondary');
  wide && classes.push('Card--wide');

  return (
    <Flex
      className={classes.join(' ')}
      dataGroup={dataGroup}
      dataComponent="Card"
      dataIndex={dataIndex}
      dataType={dataType}
      flexDirection="column"
    >
      {children}
    </Flex>
  );
}


Card.displayName = 'Card';

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dataGroup: PropTypes.string,
  dataIndex: PropTypes.string,
  dataType: PropTypes.string,
  secondary: PropTypes.bool,
  wide: PropTypes.bool,
  ...Flex.flexPropTypes,
};

Card.defaultProps = {
  secondary: false,
  wide: false,
};
