import PropTypes from 'prop-types';
import React from 'react';


export default function DialogBody(props) {
  const {
    children,
  } = props;


  return (
    <section className="DialogBody">
      {children}
    </section>
  );
}


DialogBody.propTypes = {};
