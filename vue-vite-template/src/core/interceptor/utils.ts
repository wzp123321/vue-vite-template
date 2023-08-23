import { InternalAxiosRequestConfig } from 'axios';
import { storeToRefs } from 'pinia';
import { FORBIDDEN_CODE, PREFIX_PATH, TIME_OUT } from '../../config';
import { Common_IRequestConfig } from './api';
//引入store
import useInterceptorStore from '../../pinia/interceptor';

const store = useInterceptorStore();
// 解构store/user.ts中userInfo的信息,让数据变成响应式，这样就可以在组件中修改store中的数据

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
/**
 * 根据code、message处理响应结果
 * @param code
 * @param message
 */
export const checkAxiosPermission = (code: number, message: string) => {
  const { isTokenFailureFlag } = storeToRefs(store);
  if (FORBIDDEN_CODE === +code && !isTokenFailureFlag) {
    // Todo
    // 根据Error具体信息做出具体操作
  }
};
/**
 * 处理流数据
 * @param blob
 */
export const checkBlobPermission = (blob: Blob) => {
  if (blob.size && blob.type === 'application/json') {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      const res = JSON.parse(e.target?.result as string);
      // Todo
      // 根据json具体信息做出具体操作
    };
    reader.readAsText(blob);
  }
};
