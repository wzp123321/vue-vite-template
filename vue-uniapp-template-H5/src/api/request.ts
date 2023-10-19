// http请求全局配置、请求、响应拦截
import Request from 'luch-request';
// 配置
import { baseURL } from '@/config/request';
// 工具方法
import { FGetStorageData } from '@/utils/storage';
import { FGetAuthorization } from '@/utils/authoration';
import type { Common_IObject } from './model';
import { SESSION_KEY_LOGINNAME, SESSION_KEY_TOKEN, SESSION_KEY_TENANT_CODE } from '@/config/session-key';

// 节流接口列表
const throttleRequestList = new Set();
const throttleMap = new Map<string, Promise<any>>();

const http = new Request();
http.setConfig((config) => {
	/* 设置全局配置 */
	config.baseURL = baseURL;
	return config;
});

// 请求之前拦截器。可以使用async await 做异步操作
http.interceptors.request.use(
	async (config) => {
		console.log('config-----------', config);
		addHeader(config);
		return config;
	},
	(config) => {
		return Promise.reject(config);
	},
);
// 添加请求头信息
const addHeader = (config: any) => {
	// token
	const token = FGetStorageData(SESSION_KEY_TOKEN);
	token && (config.header!.token = token);
	// loginName
	const loginName = FGetStorageData(SESSION_KEY_LOGINNAME);
	loginName && (config.header!.loginName = loginName);
	// tenantCode
	const tenantCode = FGetStorageData(SESSION_KEY_TENANT_CODE);
	tenantCode && (config.header!.tenantCode = tenantCode);
	// 重放加密串
	const Authorization = FGetAuthorization();
	Authorization && (config.header!.Authorization = Authorization);
	return config;
};

// /* 响应之后拦截器。可以使用async await 做异步操作  */
http.interceptors.response.use(
	async (response) => {
		throttleMap.delete(response?.config?.url as string);
		return response.data;
	},
	(response) => {
		// 请求错误做点什么。可以使用async await 做异步操作
		return Promise.reject(response);
	},
);

const commonHttp = {
	post(url: string, params?: Common_IObject | string | number, options?: Common_IObject) {
		// 如果需要做节流处理
		if (!options?.custom!.throttleFlag || (options?.custom?.throttleFlag && !throttleMap.has(url))) {
			const res = http.post(url, params as any, options);
			console.log('之前没有请求过，需要向map中存一份');
			throttleMap.set(url, res);
			return res;
		}
	},
};

export { commonHttp };
