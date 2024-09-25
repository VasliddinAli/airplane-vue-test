import { createApp } from 'vue'
import App from './App.vue'
import naive from "naive-ui";

const app = createApp(App);

import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

app.use(naive);

app.mount('#app')
