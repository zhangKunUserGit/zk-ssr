import React from 'react';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import About from '../views/About';

export const AppComponent = (prevState, insertCss) => (
  <StyleContext.Provider value={{ insertCss }}>
    <About.AppComponent prevState={prevState} />
  </StyleContext.Provider>
);
export const setPrevState = About.setPrevState;
