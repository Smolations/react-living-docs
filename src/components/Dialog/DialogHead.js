import PropTypes from 'prop-types';
import React from 'react';


export default function DialogHead(props) {
  const {
    children,
  } = props;


  return (
    <section className="DialogHead">
      {children}
    </section>
  );
}


DialogHead.propTypes = {};
