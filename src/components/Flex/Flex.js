import {
  intersection,
  omit,
  sum,
} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import pickFlexProps from './pick-flex-props';

import './Flex.scss';


const flexPropTypes = {
  alignContent: PropTypes.string,
  alignItems: PropTypes.string,
  flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  flexWrap: PropTypes.oneOf(['wrap', 'nowrap']),
  justifyContent: PropTypes.string,

  alignSelf: PropTypes.string,
  flexGrow: PropTypes.number,
  flexShrink: PropTypes.number,
  flexBasis: PropTypes.string,
};


function getPercent(float, precision = 2) {
  return `${Number.parseFloat(float * 100).toPrecision(precision)}%`;
}


/**
 *  This is a flex container implementation to allow for easy and customizable
 *  layouts using only a component and props. This helps confine flex styles
 *  to the component implementation so that stylesheets aren't littered with
 *  tons of flex declarations which are harder to track down when debugging.
 *  Children of this component should either be `Flex`, `Flex.Item`, or another
 *  component that will pass the props down the aforementioned components. If
 *  the third situation is the case, be sure to declare the appropriate
 *  propTypes on that component so that they will be applied as expected. See
 *  the `Card` component for an example.
 *
 *  Each flex-related prop is simply a camelCased version of the associated
 *  CSS property names. For more information, see this flexbox primer:
 *  @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox
 *
 *  @prop {string} [alignContent]  Value used for flex containers.
 *  @prop {string} [alignItems]    Value used for flex containers.
 *  @prop {string} [alignSelf]     Value used for flex items.
 *  @prop {node}   children        This container requires children. Without them, there's nothing
 *                                 to lay out!
 *  @prop {string} [className]     Any additional classes to add to the parent element.
 *  @prop {number} [cols]          Specifying a value here will initialize a simple grid system
 *                                 that will set up element layout based on a child's `colSpan`
 *                                 prop. If some or no children specify that prop, the grid will
 *                                 be an educated guess.
 *  @prop {string} [dataComponent] A value used by automated tests.
 *  @prop {string} [dataGroup]     A value used by automated tests.
 *  @prop {number} [dataIndex]     A value used by automated tests.
 *  @prop {string} [dataType]      A value used by automated tests.
 *  @prop {string} [flexBasis]     Value used for flex items.
 *  @prop {string} [flexDirection] Value used for flex containers.
 *  @prop {number} [flexGrow]      Value used for flex items.
 *  @prop {number} [flexShrink]    Value used for flex items.
 *  @prop {string} [flexWrap]      Value used for flex containers.
 */
export default function Flex(props) {
  const {
    className,
    cols,
    dataComponent,
    dataGroup,
    dataIndex,
    dataType,
  } = props;

  const classes = className ? `Flex ${className}` : 'Flex';
  const childrenArray = React.Children.toArray(props.children);
  const childCount = childrenArray.length;
  const { flexContainerProps, flexItemProps } = pickFlexProps(props);


  // when `cols` is not specified, the layout will make an educated inference
  // at what each flex item's `colSpan` should be. we gather up each child's
  // `colSpan`, specifying 1 if the prop is not provided.
  const childColSpans = childrenArray.map(child => (child.props && child.props.colSpan) || 1);
  const childColSpanSum = sum(childColSpans);

  const newChildren = React.Children.map(childrenArray, (child) => {
    // bail early for text nodes, etc
    if (!child.props) {
      return child;
    }
    // in order to avoid passing flex props to non-flex children,
    // we verify that the child accepts the props
    const childPropNames = Object.keys(child.type.propTypes || {});
    const flexPropTypeNames = Object.keys(flexPropTypes);

    if (!intersection(childPropNames, flexPropTypeNames).length) {
      return child;
    }

    const { colSpan: childColSpan } = child.props;
    const { flexItemProps: childFlexItemProps } = pickFlexProps(child.props);

    let newChildProps = { ...child.props };

    // if this property is provided, it overrides any manually
    // set flex item props (e.g. flexGrow) for each Flex/FlexItem child,
    // so we remove them from the new child props
    if (cols) {
      newChildProps = omit(child.props, [
        'colSpan',
        ...Object.keys(childFlexItemProps),
      ]);

      if (childColSpan) {
        newChildProps.flexBasis = getPercent(childColSpan / cols);
        newChildProps.flexGrow = 0;
        newChildProps.flexShrink = 0;
      } else {
        newChildProps.flexBasis = getPercent(1 / cols);
      }
    } else if (childColSpanSum > childCount && childColSpan) {
      // here we infer what the colSpans should be based on the
      // information we collected before this loop
      newChildProps.flexBasis = getPercent(childColSpan / childColSpanSum);
      newChildProps.flexGrow = 0;
      newChildProps.flexShrink = 0;
    } else {
      // no specificity, so we let the default values for
      // flex items take over. if we make it to this line,
      // the output/display will most likely be unexpected.
      // takeaway: be specific!
      newChildProps.flexShrink = 1;
    }

    return React.cloneElement(child, newChildProps, child.props.children);
  });


  // @todo? return React.createElement for conditional data attributes
  return (
    <div
      className={classes}
      data-component={dataComponent}
      data-group={dataGroup}
      data-index={dataIndex}
      data-type={dataType}
      style={{ ...flexContainerProps, ...flexItemProps }}
    >
      {newChildren}
    </div>
  );
}


Flex.displayName = 'Flex';

// providing these here so that other components which wrap
// this one can include applicable proptypes
Flex.flexPropTypes = flexPropTypes;

Flex.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dataComponent: PropTypes.string,
  dataGroup: PropTypes.string,
  dataIndex: PropTypes.number,
  dataType: PropTypes.string,
  ...Flex.flexPropTypes,
};

Flex.defaultProps = {
  dataComponent: 'Flex',
  dataGroup: 'Flex',
  dataIndex: 0,
  dataType: 'Flex',

  /* eslint-disable react/default-props-match-prop-types */
  flexGrow: 1,
  flexShrink: 0,
  /* eslint-enable react/default-props-match-prop-types */
};
