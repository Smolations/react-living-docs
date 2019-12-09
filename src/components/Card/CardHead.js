import PropTypes from 'prop-types';
import React from 'react';

import { Flex, pickFlexProps } from '../Flex';

import './CardHead.scss';


/**
 *  The CardHead component.
 */
export default function CardHead(props) {
  const { children } = props;
  const { flexContainerProps, flexItemProps } = pickFlexProps(props);

  return (
    <Flex
      className="CardHead"
      {...flexContainerProps}
      {...flexItemProps}
    >
      {children}
    </Flex>
  );
}


CardHead.displayName = 'CardHead';

CardHead.propTypes = {
  children: PropTypes.node.isRequired,
  ...Flex.flexPropTypes,
};
