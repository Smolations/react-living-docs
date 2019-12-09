import PropTypes from 'prop-types';
import React from 'react';

import pickFlexProps from './pick-flex-props';

import './FlexItem.scss';


/**
 *  This component should only be used when it will be contained within
 *  a `Flex` component or a component wrapping a `Flex` component. This component
 *  can also be wrapped by another component, passing either all or some of
 *  the accepted flex props.
 *
 *  @prop {string} [alignSelf]  Value used for flex items.
 *  @prop {node}   [children]   This container requires children. Without them, there's nothing
 *                              to lay out!
 *  @prop {string} [className]  Any additional classes to add to the parent element.
 *  @prop {string} [flexBasis]  Value used for flex items.
 *  @prop {number} [flexGrow]   Value used for flex items.
 *  @prop {number} [flexShrink] Value used for flex items.
 */
export default function FlexItem(props) {
  const {
    children,
    className,
  } = props;

  const { flexItemProps } = pickFlexProps(props);

  const classes = className ? `FlexItem ${className}` : 'FlexItem';


  return (
    <div className={classes} style={{ ...flexItemProps }}>
      {children}
    </div>
  );
}


FlexItem.displayName = 'FlexItem';

// providing these here so that other components which wrap
// this one can include applicable proptypes
FlexItem.flexPropTypes = {
  alignSelf: PropTypes.string,
  flexGrow: PropTypes.number,
  flexShrink: PropTypes.number,
  flexBasis: PropTypes.string,
};


FlexItem.propTypes = {
  children: PropTypes.node,
  ...FlexItem.flexPropTypes,
};

FlexItem.defaultProps = {
  /* eslint-disable react/default-props-match-prop-types */
  flexGrow: 1,
  flexShrink: 0,
  /* eslint-enable react/default-props-match-prop-types */
};
