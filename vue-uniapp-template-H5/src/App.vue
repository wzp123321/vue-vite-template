<script setup lang="ts">
import { onHide, onLaunch } from '@dcloudio/uni-app';
import { useStore } from 'vuex';
// 枚举
import { Common_EBridgeType } from './config/enum';
// 工具方法
import nativeBridge from './core/nativeBridge';
import { FSetStorageData } from './utils/storage';
// 请求
import { commonHttp } from './api/request';
import {
	SESSION_KEY_TIME_DIFF,
	SESSION_KEY_LOGINNAME,
	SESSION_KEY_TOKEN,
	SESSION_KEY_TENANT_CODE,
} from './config/session-key';

// store
const store = useStore();

/**
 * 初始化，获取基础配置信息
 */
const getBasicConfiguration = async () => {
	nativeBridge.nativeCall(Common_EBridgeType.获取配置信息, {}, (result) => {
		console.log('%c✨✨获取配置信息✨✨', 'font-size: 24px', JSON.parse(JSON.stringify(result)));
		const res = JSON.parse(result as string);
		FSetStorageData(SESSION_KEY_TOKEN, res?.token);
		FSetStorageData(SESSION_KEY_TENANT_CODE, res.tenantId);
		FSetStorageData('energy-name', res.name);
		if (res.loginInfo) {
			const loginInfo = JSON.parse(res.loginInfo);
			FSetStorageData(SESSION_KEY_LOGINNAME, loginInfo?.resultBody?.loginName);
		}
	});
};
/**
 * 查询系统时间
 */
const getSystemTime = async () => {
	const res = await commonHttp.post('/common/system/time', {});
	if (res) {
		store.dispatch('setSystemTime', res?.data);
		FSetStorageData(SESSION_KEY_TIME_DIFF, res?.data);
	}
};

/**
 * 初始化获取用户信息
 */
onLaunch(() => {
	getBasicConfiguration();
	getSystemTime();
	uni.addInterceptor('navigateTo', {
		//监听跳转
		success(e) {
			getSystemTime();
		},
	});
	uni.addInterceptor('redirectTo', {
		//监听关闭本页面跳转
		success(e) {
			getSystemTime();
		},
	});
	uni.addInterceptor('switchTab', {
		//监听tabBar跳转
		success(e) {
			getSystemTime();
		},
	});
	uni.addInterceptor('navigateBack', {
		//监听返回
		success(e) {
			getSystemTime();
		},
	});
});
onHide(() => {
	uni.removeInterceptor('navigateTo');
	uni.removeInterceptor('redirectTo');
	uni.removeInterceptor('switchTab');
	uni.removeInterceptor('navigateBack');
});
</script>
<style>
.uni-page-body {
	height: 100%;
}
</style>
