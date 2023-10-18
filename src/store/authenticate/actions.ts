export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const signUp = (data: string) => {
  return {
    type: SIGNUP,
    payload: data,
  };
};

export const signUpSuccess = (data: string) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: data,
  };
};

export const signUpFailure = (data: string) => {
  return {
    type: SIGNUP_FAILURE,
    payload: data,
  };
};

export const SIGNIN = 'SIGNIN';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

export const signIn = (data: string) => {
  return {
    type: SIGNIN,
    payload: data,
  };
};

export const signInSuccess = (data: string) => {
  return {
    type: SIGNIN_SUCCESS,
    payload: data,
  };
};

export const signInFailure = (data: string) => {
  return {
    type: SIGNIN_FAILURE,
    payload: data,
  };
};

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export const forgotPassword = (data: string) => {
  return {
    type: FORGOT_PASSWORD,
    payload: data,
  };
};

export const forgotPasswordSuccess = (data: string) => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload: data,
  };
};

export const forgotPasswordFailure = (data: string) => {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    payload: data,
  };
};
