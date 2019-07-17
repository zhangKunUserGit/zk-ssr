import React from 'react';
import { hydrate } from 'react-dom';
import Home from '../views/Home';

hydrate(<Home.AppComponent />, document.getElementById('root'));
