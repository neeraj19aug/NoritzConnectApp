/* eslint-disable no-undef */
import {
  WARRANTY_REGISTER_REQUEST,
  WARRANTY_REGISTER_SUCCESS,
  WARRANTY_REGISTER_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case WARRANTY_REGISTER_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case WARRANTY_REGISTER_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case WARRANTY_REGISTER_FAILURE:
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
