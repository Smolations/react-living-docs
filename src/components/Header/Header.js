import classnames from 'classnames'
import PropTypes from 'prop-types';
import React from 'react';

import './Header.scss';


export default function Header(props) {
  const {
    // we aren't using defaultProps for size in order to allow
    // other components to set the size programmatically when
    // <Header/> is used without passing a size prop (e.g. Dialog, Card)
    size = 1,

    children,
    className,
    dataGroup,
    icon,
    title,
    tooltip,
  } = props;

  const HeadingType = `h${size}`;
  const classes = classnames('Header', className);


  function renderIcon() {
    return icon
      ? (<i key="icon" className={`Header--icon ricon ricon-${icon}`}></i>)
      : null;
  }


  return (
    <header className={classes} data-component="Header" data-group={dataGroup}>
      <HeadingType>{renderIcon()} {title} {tooltip}</HeadingType>
      {children}
    </header>
  );
}


Header.displayName = 'Header';

Header.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  dataGroup: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  title: PropTypes.string,
  tooltip: PropTypes.node,
};

Header.defaultProps = {
  title: 'Header',
};
