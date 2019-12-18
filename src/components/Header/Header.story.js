import React from 'react';


export function SimpleHeaders(props) {
  return (
    <React.Fragment>
      <Header title="I'm an h1!" />
      <Header size={2} title="I'm an h2!" />
      <Header size={3} title="I'm an h3!" />
      <Header size={4} title="I'm an h4!" />
      <Header size={5} title="I'm an h5!" />
      <Header size={6} title="I'm an h6!" />
    </React.Fragment>
  );
}


export function HeadersWithIcon(props) {
  return (
    <React.Fragment>
      <Header icon="graph" title="h1. Graphs are purty..." />
      <Header icon="control_panel" size={2} title="h2. I can has controls" />
      <Header icon="users" size={3} title="h3. Users really grind my gears!" />
      <Header icon="settings" size={4} title="h4. What happens if I flip this switch?" />
      <Header icon="lock" size={5} title="h5. This is forbidden!" />
      <Header icon="calendar" size={6} title="h6. Crap, late for an appt!" />
    </React.Fragment>
  );
}


export function HeaderWithAction(props) {
  return (
    <Header size={3} title="I'm an h3!" />
  );
}


export function HeaderKitchenSink(props) {
  return (
    <Header size={3} title="I'm an h3!" />
  );
}
