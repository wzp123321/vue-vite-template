import App from './App.vue';
import { createSSRApp } from 'vue';
import store from './store';
// import router from './router/index';
// 引入样式
import '@tiansu/ts-mobile-package/dist/styles/index.css';
// 注册全局组件
import registerComponents from './core/registerComponents';
import { FSetStorageData } from './utils/storage';

export function createApp() {
	if(process.env.NODE_ENV === 'development'){
		FSetStorageData('energy-token', '72baa114acff4698aba79023a080b628142e62a833f67eea4a1066e0f3eda2091697684704656')
		FSetStorageData('energy-loginName', 'wanzp')
		FSetStorageData('energy-tenantCode', '700')
	}
	const app = createSSRApp(App);
	registerComponents(app);
	app.use(store);
	// app.use(router);

	return {
		app,
	};
}
