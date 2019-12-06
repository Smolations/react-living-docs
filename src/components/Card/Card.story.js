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
      <Card.Head>
        I am the card header.
      </Card.Head>

      Otherwise, I am empty.
    </Card>
  );
}


