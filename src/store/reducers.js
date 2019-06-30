import { combineReducers } from 'redux';
import homeReducers from '../modules/home/reducers/index';

export default combineReducers({
  ...homeReducers
});
