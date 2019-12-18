import PropTypes from 'prop-types';
import React from 'react';

import { Flex } from '../Flex';

import './Card.scss';


/**
 *  The Card component.
 *
 *  @param {string}  className Additional classes to pass to the wrapper.
 *  @param {string}  dataGroup Value to be assigned to the `data-group` attribute.
 *  @param {string}  dataIndex Value to be assigned to the `data-index` attribute.
 *  @param {string}  dataType  Value to be assigned to the `data-type` attribute.
 *  @param {boolean} secondary When `true`, de-emphasizes styling of the card.
 */
export default function Card(props) {
  const {
    children,
    className,
    dataGroup,
    dataIndex,
    dataType,
    secondary,
    wide,
  } = props;

  // temporary name since .Card is taken
  const classes = ['Card2'];

  // default header size according to common use matches with h3,
  // so be sure to set it if not already set
  const newChildren = React.Children.map(children, (child) => {
    const { children: childChildren, ...otherChildProps } = child.props;
    if (child.type.displayName === 'Header' && !otherChildProps.size) {
      console.log('Card found Header! %o', child)
      otherChildProps.size = 3;

      return React.cloneElement(child, otherChildProps, childChildren);
    }

    return child;
  });


  className && classes.push(...className.split(' '));
  secondary && classes.push('Card--secondary');
  wide && classes.push('Card--wide');

  return (
    <Flex
      className={classes.join(' ')}
      dataGroup={dataGroup}
      dataComponent="Card"
      dataIndex={dataIndex}
      dataType={dataType}
      flexDirection="column"
    >
      {newChildren}
    </Flex>
  );
}


Card.displayName = 'Card';

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dataGroup: PropTypes.string,
  dataIndex: PropTypes.string,
  dataType: PropTypes.string,
  secondary: PropTypes.bool,
  wide: PropTypes.bool,
  ...Flex.flexPropTypes,
};

Card.defaultProps = {
  secondary: false,
  wide: false,
};
