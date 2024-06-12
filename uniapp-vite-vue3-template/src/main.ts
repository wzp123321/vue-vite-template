/*
 * @Author: yut
 * @Date: 2024-01-02 21:01:28
 * @LastEditors: wanzp wanzp@tiansu-china.com
 * @LastEditTime: 2024-01-09 19:58:36
 * @Descripttion:
 */
import App from './App.vue';
import { createSSRApp } from 'vue';
import store from './store';
// import router from './router/index';
// 引入样式
import './assets/css/common.scss';
// 注册全局组件
import registerComponents from './core/registerComponents';
import { FSetStorageData } from './utils/storage';
// 指令
import { registerDirective } from './directives/index';

import Vconsole from 'vconsole'; // 引入 vconsole
new Vconsole(); // 如所有环境均需开启 则不需要判断

export function createApp() {
  // 开发环境
  if (process.env.NODE_ENV === 'development') {
    FSetStorageData('energy-token', 'd7c3e45a3879459dbd2bb2ec739f99d7142e62a833f67eea4a1066e0f3eda2091704697114892');
    FSetStorageData('energy-loginName', 'admin');
    FSetStorageData('energy-tenantCode', '700');
    FSetStorageData('energy-userId', '22');
    FSetStorageData('energy-userId', '27053259524942800');
  }
  const app = createSSRApp(App);
  registerComponents(app);
  registerDirective(app);
  app.use(store);
  // app.use(router);

  return {
    app,
  };
}
