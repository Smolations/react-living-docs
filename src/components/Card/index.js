/**
 *  The `Card` component is used frequently in the app to encapsulate related
 *  information. It is pretty flexible and almost anything will fit inside it.
 *
 *  @module Card
 */

import Card from './Card';
import CardCol from './CardCol';
import CardHead from './CardHead';
import CardRow from './CardRow';
import CardRowCol from './CardRowCol';
import Cards from './Cards';


Card.Col = CardCol;
Card.Head = CardHead;
Card.Row = CardRow;
Card.RowCol = CardRowCol;


export {
  Card,
  Cards,
};
