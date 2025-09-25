import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from './router/index';
import { createPinia } from 'pinia';
import Vant from 'vant'
import 'vant/lib/index.css';

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(Vant).mount('#app')
