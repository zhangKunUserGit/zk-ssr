import React from 'react';
import { hydrate } from 'react-dom';
import ShoppingCart from '../views/ShoppingCart';

hydrate(<ShoppingCart.AppComponent />, document.getElementById('root'));
