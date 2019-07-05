import React from 'react';
import { hydrate } from 'react-dom';
import Home from './Home';

hydrate(<Home.AppComponent />, document.getElementById('root'));
