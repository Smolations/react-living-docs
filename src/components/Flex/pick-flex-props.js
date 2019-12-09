import isNil from 'lodash/isNil';
import pickBy from 'lodash/pickBy';


/**
 *  This is a function that will pick specific flex properties
 *  from an object (almost always `props`) and return them
 *  so that they may be applied to rendered elements. This is
 *  most useful for components which wrap the `Flex` components.
 *  See the `Card` component for common implementation.
 *
 *  @param   {object} props This will almost always be props passed to a
 *                          component, but it can technically be any object
 *                          that contains props.
 *
 *  @returns {object} An object with two properties, `flexContainerProps`
 *                    and `flexItemProps` which contain only their respective
 *                    flex props to be passed to `Flex` components.
 */
export default function pickFlexProps(props) {
  const targetContainerProps = [
    'alignContent',
    'alignItems',
    'flexDirection',
    'flexWrap',
    'justifyContent',
  ];

  const targetItemProps = [
    'alignSelf',
    'flexBasis',
    'flexGrow',
    'flexShrink',
  ];

  // given the various values for some of the props, we only
  // check that associated values are not `null` or `undefined`.
  const flexContainerProps = pickBy(props, (val, key) => {
    const isTargetProp = targetContainerProps.includes(key);
    return isTargetProp && !isNil(val);
  });

  const flexItemProps = pickBy(props, (val, key) => {
    const isTargetProp = targetItemProps.includes(key);
    return isTargetProp && !isNil(val);
  });


  return {
    flexContainerProps,
    flexItemProps,
  };
}
