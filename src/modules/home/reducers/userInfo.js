import { REMOVE_USER_INFO, SET_USER_INFO } from '../constants/actionTypes';

export default function userInfo(state = {}, action) {
  switch (action.type) {
    case SET_USER_INFO:
      const value = action.value;
      return { ...state, ...value };
    case REMOVE_USER_INFO:
      return { isLogined: false };
    default:
      return state;
  }
}
