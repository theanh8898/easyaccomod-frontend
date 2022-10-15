export const LOGIN_SUCCESS_AC = 'LOGIN_SUCCESS_AC';
export const LOGOUT_AC = 'LOGOUT_AC';
export const LOGOUT_SUCCESS_AC = 'LOGOUT_SUCCESS_AC';
export const CHECK_REMEMBERED_USER_AC = 'CHECK_REMEMBERED_USER_AC';
export const CHECK_REMEMBERED_USER_SUCCESS_AC = 'CHECK_REMEMBERED_USER_SUCCESS_AC';
export const GET_CURRENT_USER_AC = 'GET_CURRENT_USER_AC';
export const GET_CURRENT_USER_SUCCESS_AC = 'GET_CURRENT_USER_SUCCESS_AC';
export const UPDATE_CURRENT_USER_AC = 'UPDATE_CURRENT_USER_AC';

export const loginSuccessAC = (tokens) => ({
  type: LOGIN_SUCCESS_AC,
  tokens,
});

export const logoutAC = (isSessionExpired = false) => ({
  type: LOGOUT_AC,
  isSessionExpired,
});

export const logoutSuccessAC = () => ({
  type: LOGOUT_SUCCESS_AC,
});

export const checkRememberedUserAC = () => ({
  type: CHECK_REMEMBERED_USER_AC,
});

export const checkRememberedUserSuccessAC = (isAuthenticated = false) => ({
  type: CHECK_REMEMBERED_USER_SUCCESS_AC,
  isAuthenticated,
});

export const getCurrentUserAC = () => ({
  type: GET_CURRENT_USER_AC,
});

export const getCurrentUserSuccessAC = (data) => ({
  type: GET_CURRENT_USER_SUCCESS_AC,
  data,
});

export const updateCurrentUserAC = (data) => ({
  type: UPDATE_CURRENT_USER_AC,
  data,
});
