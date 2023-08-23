import { createApp } from 'vue';
import App from './app.vue';
import router from './router';
import { createPinia } from 'pinia';

// 拦截器
import './core/interceptor/index';
// 公共样式
import './assets/css/index.less';

const pinia = createPinia();
const app = createApp(App);
app.use(router).use(pinia).mount('#app');
