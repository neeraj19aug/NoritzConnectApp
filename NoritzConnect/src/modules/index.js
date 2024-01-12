import { combineReducers } from 'redux';
// import authReducer from './authentication/reducer';
// import categoriesReducer from './categories/reducer';
// import bookingReducer from './booking/reducer';
import LoginReducer from './Login';

const appReducer = combineReducers({
  LoginReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
