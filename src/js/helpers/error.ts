/* eslint-disable no-console */
import { message } from 'antd';

export const getErrorMessage = (error: any): string => {
  const message = error?.response?.data?.message;
  return message && typeof message === 'string' ? String(message) : 'Something went wrong!';
};

export const showErrorMessage = (error: any): void => {
  message.destroy();
  message.error(getErrorMessage(error));
  console.log(error);
};
