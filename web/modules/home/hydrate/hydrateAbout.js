import React from 'react';
import { hydrate } from 'react-dom';
import About from '../views/About';

hydrate(<About.AppComponent />, document.getElementById('root'));
