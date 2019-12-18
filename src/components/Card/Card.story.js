import _ from 'lodash';
import React from 'react';


/**
 *  This is a demo of an empty card.
 */
export function EmptyCard(props) {
  const kind = _.camelCase(props.kind);

  return (
    <Card>
      I am an {kind} Card.
    </Card>
  );
}

EmptyCard.defaultProps = {
  kind: 'awesome',
  stuff: (<div>hi</div>),
};


/**
 *  This is a demo of a card with header content.
 */
export function CardWithHeader(props) {
  return (
    <Card>
      <Header title="I am the card header." />

      <Card.Row>Otherwise, I am empty.</Card.Row>
    </Card>
  );
}


