import React from 'react';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import Home from './Home';

export const AppComponent = (prevState, insertCss) => (
  <StyleContext.Provider value={{ insertCss }}>
    <Home.AppComponent prevState={prevState} />
  </StyleContext.Provider>
);
export const setPrevState = Home.setPrevState;
