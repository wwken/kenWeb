import { userConstants } from '../_constants';
import Immutable from 'immutable';
import initialState from './initialState';

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      state = state.set('loggingIn', true);
      state = state.set('user', Immutable.fromJS(action.user));
      break;
    case userConstants.LOGIN_SUCCESS:
      state = state.set('loggedIn', true);
      state = state.set('user', Immutable.fromJS(action.user));
      break;
    case userConstants.LOGIN_FAILURE:
      break;
    case userConstants.LOGOUT:
      state = state.set('loggedIn', false);
      break;
    default:
      break;
  }
  return state;
}
