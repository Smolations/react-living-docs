import PropTypes from 'prop-types';
import React from 'react';


export default function DialogFoot(props) {
  const {
    children,
  } = props;


  return (
    <section className="DialogFoot">
      {children}
    </section>
  );
}


DialogFoot.propTypes = {};
