import { createApp } from 'vue';
import App from './app.vue';
import router from './router/index';
import store from './pinia/index';

const app = createApp(App);

app.use(store);
// 拦截器
import './core/interceptor/index';
// 公共样式
import './assets/css/index.less';

app.use(router).mount('#app');
