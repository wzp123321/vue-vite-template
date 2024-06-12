/*
 * @Author: wzp123321 wanzhipengx@163.com
 * @Date: 2024-01-07 20:52:04
 * @LastEditors: wzp123321 wanzhipengx@163.com
 * @LastEditTime: 2024-06-12 22:24:27
 * @FilePath: \vue-vite-template\vue-vite-template\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue';
import App from './app.vue';
import router from './router';
import { createPinia } from 'pinia';
import './service/interceptor/index';

// 样式
import './assets/css/index.less';

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia).mount('#app');
