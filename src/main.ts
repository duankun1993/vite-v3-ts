import { createApp } from 'vue';
import App from './App.vue';

import Antd from 'ant-design-vue';

import router from './router';
import pinia from './store';
import directive from './configs/directive';

// import './libs/wallet/coinbase'
import './utils/numberUtility'
import './style.css';
import "./configs/reset";
import 'ant-design-vue/dist/reset.css';

window.process = import.meta;

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(directive);
app.use(Antd);
app.mount('#app');
