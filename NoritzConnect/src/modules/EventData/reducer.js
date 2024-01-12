/* eslint-disable no-undef */
import {
  EVENTDATA_REQUEST,
  EVENTDATA_SUCCESS,
  EVENTDATA_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENTDATA_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case EVENTDATA_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case EVENTDATA_FAILURE:
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
