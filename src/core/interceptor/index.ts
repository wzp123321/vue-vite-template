/*
 * @Author: wanzp
 * @Date: 2023-08-07 22:25:42
 * @LastEditors: wanzp
 * @LastEditTime: 2023-08-08 14:20:13
 * @Description: 请求拦截器
 */
import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { Common_IRequestConfig } from './api';
import { addHeader, addPrefix, addTimeOut, checkAxiosPermission, checkBlobPermission } from './utils';

//  请求拦截器
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig<Common_IRequestConfig>) => {
    addHeader(config);
    addPrefix(config);
    addTimeOut(config);
    return config;
  },
  (error) => {
    throw error;
  },
);

// 响应拦截器
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response?.data?.size) {
      checkBlobPermission(response?.data);
    } else {
      checkAxiosPermission(+response.data.code, response.data.message);
    }
    return response;
  },
  (error) => {
    if (error?.response?.data?.size) {
      checkBlobPermission(error?.response.data);
    } else {
      checkAxiosPermission(+error?.response?.data?.code, error?.response?.data?.message);
    }
    throw error;
  },
);
