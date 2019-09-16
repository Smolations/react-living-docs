import PropTypes from 'prop-types';
import React from 'react';

import './CardHead.scss';


/**
 *  The CardHead component.
 */
export default function CardHead(props) {
  const { children } = props;

  return (
    <div className="CardHead">
      {children}
    </div>
  );
}


CardHead.propTypes = {
  children: PropTypes.node.isRequired,
};
