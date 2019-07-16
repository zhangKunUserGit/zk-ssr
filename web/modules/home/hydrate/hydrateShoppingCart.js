import React from 'react';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { hydrate } from 'react-dom';
import ShoppingCart from '../views/ShoppingCart';

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss());
  return () => removeCss.forEach(dispose => dispose());
};

hydrate(
  <StyleContext.Provider value={{ insertCss }}>
    <ShoppingCart.AppComponent />
  </StyleContext.Provider>,
  document.getElementById('root')
);
