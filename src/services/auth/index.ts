import apiClient from '../api';

const ENDPOINT = '/auth';

// TODO: Update returned Promise type interface
export const signUp = (email: string, password: string): Promise<any> =>
  apiClient.post(`${ENDPOINT}/signup`, { email, password });

export const signIn = (email: string, password: string): Promise<any> =>
  apiClient.post(`${ENDPOINT}/signin`, { email, password });

export const forgotPassword = (email: string, password: string): Promise<any> =>
  apiClient.post(`${ENDPOINT}/forgot_password`, { email, password });

export const resetPassword = (
  resetPasswordToken: string,
  password: string
): Promise<any> =>
  apiClient.post(`${ENDPOINT}/forgot_password/${resetPasswordToken}`, {
    password,
  });
