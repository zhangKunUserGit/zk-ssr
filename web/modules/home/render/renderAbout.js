import React from 'react';
import { hydrate } from 'react-dom';
import About from '../pages/About';

hydrate(<About.AppComponent />, document.getElementById('root'));
