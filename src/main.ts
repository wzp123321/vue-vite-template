import { createApp } from 'vue';
import App from './app.vue';
import router from './router';
import { createPinia } from 'pinia';

// 样式
import './assets/css/index.less';

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia).mount('#app');
