import React from 'react';
import PropTypes from 'prop-types';

const ContentWrap = ({ children }) => <div>{children}</div>;

ContentWrap.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
};

export default ContentWrap;
