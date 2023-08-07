import { InternalAxiosRequestConfig } from 'axios';
import { PREFIX_PATH, TIME_OUT } from '../../config';
import { Common_IRequestConfig } from './api';
/**
 * 添加请求头
 * @param config
 */
export const addHeader = (config: InternalAxiosRequestConfig<Common_IRequestConfig>) => {
  config.headers.token = '';
  config.headers.loginName = '';

  return config;
};
/**
 * 添加前缀
 * @param config
 * @returns
 */
export const addPrefix = (config: InternalAxiosRequestConfig<Common_IRequestConfig>) => {
  config.baseURL = PREFIX_PATH;
  return config;
};
/**
 * 添加超时时间
 * @param config
 * @returns
 */
export const addTimeOut = (config: InternalAxiosRequestConfig<Common_IRequestConfig>) => {
  config.timeout = TIME_OUT;
  return config;
};
