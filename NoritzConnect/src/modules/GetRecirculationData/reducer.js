/* eslint-disable no-undef */
// @flow
import {
  GET_RECIRC_DATA_REQUEST,
  GET_RECIRC_DATA_SUCCESS,
  GET_RECIRC_DATA_FAILURE,
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
    case GET_RECIRC_DATA_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null,
      };
    case GET_RECIRC_DATA_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload,
      };
    case GET_RECIRC_DATA_FAILURE:
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
