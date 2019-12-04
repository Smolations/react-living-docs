import PropTypes from 'prop-types';
import React from 'react';

import './TypeaheadResult.scss';


/**
 *  This is the simplest rendering of a result. It simply renders a string/number
 *  value.
 *
 *  @prop {(string|number)} value The value to render.
 */
export default function TypeaheadResult(props) {
  const { value } = props;

  return (
    <p className="TypeaheadResult">
      {value}
    </p>
  );
}


TypeaheadResult.displayName = 'TypeaheadResult';

TypeaheadResult.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
