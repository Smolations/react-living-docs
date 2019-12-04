import React from 'react';

import { Card } from './Card';


/**
 *  This is a demo of an empty card.
 */
export function LabelInCardHeader(props) {
  return (
    <Card>
      <Card.Head>
        <Label ribbon>{props.label}</Label>
      </Card.Head>

      <Card.Row>
        <p>Sweet header label, eh?</p>
      </Card.Row>
    </Card>
  );
}

LabelInCardHeader.defaultProps = {
  label: 'Totes Labeled',
};
