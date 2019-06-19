import { combineReducers } from 'redux';
import auth from './auth';
import employee from './employee';

export default combineReducers({
  auth,
  employee
});
