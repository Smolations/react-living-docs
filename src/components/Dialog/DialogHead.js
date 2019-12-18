import PropTypes from 'prop-types';
import React from 'react';

import { Flex, pickFlexProps } from '../Flex';

import './DialogHead.scss';


export default function DialogHead(props) {
  const {
    children,
    title,
  } = props;

  const { flexContainerProps, flexItemProps } = pickFlexProps(props);


  return (
    <Flex
      className="DialogHead"
      flexGrow={0}
      {...flexContainerProps}
      {...flexItemProps}
    >
      {title ? title : children}
    </Flex>
  );
}


DialogHead.propTypes = {};
