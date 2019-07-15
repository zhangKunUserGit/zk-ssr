import React from 'react';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { hydrate } from 'react-dom';
import Home from '../views/Home';

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss());
  return () => removeCss.forEach(dispose => dispose());
};

hydrate(
  <StyleContext.Provider value={{ insertCss }}>
    <Home.AppComponent />
  </StyleContext.Provider>,
  document.getElementById('root')
);
