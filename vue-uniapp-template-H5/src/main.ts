import App from './App.vue';
import { createSSRApp } from 'vue';
import store from './store';
// import router from './router/index';
// 引入样式
import './assets/css/common.scss';
// 注册全局组件
import registerComponents from './core/registerComponents';
import { FSetStorageData } from './utils/storage';

export function createApp() {
  // 开发环境
  if (process.env.NODE_ENV === 'development') {
    FSetStorageData('energy-token', 'b358217933ec46358258488426331cb1142e62a833f67eea4a1066e0f3eda2091698287049981');
    FSetStorageData('energy-loginName', 'wanzp');
    FSetStorageData('energy-tenantCode', '700');
  }
  const app = createSSRApp(App);
  registerComponents(app);
  app.use(store);
  // app.use(router);

  return {
    app,
  };
}
