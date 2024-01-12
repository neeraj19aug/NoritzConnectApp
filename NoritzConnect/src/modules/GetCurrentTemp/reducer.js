/* eslint-disable no-undef */
// @flow
import {
  GETCURRENTTEMP_REQUEST,
  GETCURRENTTEMP_SUCCESS,
  GETCURRENTTEMP_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case GETCURRENTTEMP_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case GETCURRENTTEMP_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case GETCURRENTTEMP_FAILURE:
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
