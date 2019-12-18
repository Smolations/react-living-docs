import PropTypes from 'prop-types';
import React from 'react';

import { Flex, pickFlexProps } from '../Flex';

import './DialogBody.scss';


export default function DialogBody(props) {
  const {
    children,
  } = props;

  const { flexContainerProps, flexItemProps } = pickFlexProps(props);


  return (
    <Flex
      className="DialogBody"
      flexDirection="column"
      {...flexContainerProps}
      {...flexItemProps}
    >
      {children}
    </Flex>
  );
}


DialogBody.propTypes = {};
