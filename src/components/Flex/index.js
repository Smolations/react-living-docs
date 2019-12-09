/**
 *  The `Flex` component is a generic, flexbox-based component. It can be
 *  used to create tables, layouts, and anything else that can be
 *  envisioned as a flex layout.
 *
 *  @module Flex
 */

import Flex from './Flex';
import FlexItem from './FlexItem';

import pickFlexProps from './pick-flex-props';


Flex.Item = FlexItem;


export {
  Flex,
  pickFlexProps,
};
