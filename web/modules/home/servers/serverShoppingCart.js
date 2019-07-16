import React from 'react';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import ShoppingCart from '../views/ShoppingCart';

export const AppComponent = (prevState, insertCss) => (
  <StyleContext.Provider value={{ insertCss }}>
    <ShoppingCart.AppComponent prevState={prevState} />
  </StyleContext.Provider>
);
export const setPrevState = ShoppingCart.setPrevState;
