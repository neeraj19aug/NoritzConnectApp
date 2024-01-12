/* eslint-disable no-undef */
// @flow
import {
  GET_INSTANTINFO_REQUEST,
  GET_INSTANTINFO_SUCCESS,
  GET_INSTANTINFO_FAILURE,
} from './types';

const INITIAL_STATE = [
  {
    error: null,
    response: null,
    isBusy: false,
  },
];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_INSTANTINFO_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null,
      };
    case GET_INSTANTINFO_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload,
      };
    case GET_INSTANTINFO_FAILURE:
      return {
        ...state,
        isBusy: false,
        response: null,
      };
    default:
      return state;
  }
};

export default reducer;
