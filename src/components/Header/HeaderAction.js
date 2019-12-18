import React from 'react';


import './HeaderAction.scss';


export default function HeaderAction(props) {
  return (
    <span className="HeaderAction">
      {props.children}
    </span>
  );
}
