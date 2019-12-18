import PropTypes from 'prop-types';
import React from 'react';

import { Flex, pickFlexProps } from '../Flex';

import './DialogActions.scss';


export default function DialogActions(props) {
  const {
    children,
  } = props;

  const { flexContainerProps, flexItemProps } = pickFlexProps(props);


  return (
    <Flex
      className="DialogActions"
      flexGrow={0}
      {...flexContainerProps}
      {...flexItemProps}
    >
      {children}
    </Flex>
  );
}


DialogActions.propTypes = {};
