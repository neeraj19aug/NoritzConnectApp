/* eslint-disable no-undef */
// @flow
import {
  APP_VERSION_DATA_REQUEST,
  APP_VERSION_DATA_SUCCESS,
  APP_VERSION_DATA_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case APP_VERSION_DATA_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case APP_VERSION_DATA_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case APP_VERSION_DATA_FAILURE:
      return {
        ...state,
        isBusy: false,
        response: null
      };
    default:
      return state;
  }
};

export default reducer;
