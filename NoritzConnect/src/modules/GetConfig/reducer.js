import {
  GETCONFIG_REQUEST,
  GETCONFIG_SUCCESS,
  GETCONFIG_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case GETCONFIG_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case GETCONFIG_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case GETCONFIG_FAILURE:
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
