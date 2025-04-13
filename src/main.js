

import { createApp } from 'vue'
import App from './App.vue'
import router from './route/Index'
// import '../public/assets/css/bootstrap.min.css';
// import 'bootstrap';
import { createPinia } from 'pinia';


createApp(App).use(createPinia())
.use(router).mount('#app')
