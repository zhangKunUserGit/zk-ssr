import React from 'react';
import Home from '../views/Home';

export const AppComponent = prevState => <Home.AppComponent prevState={prevState} />;
export const setPrevState = Home.setPrevState;
