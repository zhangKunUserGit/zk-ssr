import React from 'react';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { hydrate } from 'react-dom';
import About from '../views/About';

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss());
  return () => removeCss.forEach(dispose => dispose());
};

hydrate(
  <StyleContext.Provider value={{ insertCss }}>
    <About.AppComponent />
  </StyleContext.Provider>,
  document.getElementById('root')
);
