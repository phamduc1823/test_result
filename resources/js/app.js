import './bootstrap';
import { createApp } from 'vue';
import { InputNumber, Select, Steps, Button, message, Form } from 'ant-design-vue';
import App from './App.vue';

import 'ant-design-vue/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

const app = createApp(App);
app.use(bootstrap);
app.use(Form);
app.use(Select);
app.use(InputNumber);
app.use(Steps);
app.use(Button);
app.mount("#app");

app.config.globalProperties.$message = message;