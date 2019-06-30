import { SET_USER_INFO } from '../constants/actionTypes';

export function setUserInfo(value) {
  return {
    type: SET_USER_INFO,
    value: value
  };
}

export function userLogin() {
  return async dispatch => {
    const info = await new Promise(resolve => {
      return resolve({ accessToken: 'xxxxx', email: 'xxxxxyyyyy' });
    });
    dispatch(setUserInfo(info.data));
    return info;
  };
}
