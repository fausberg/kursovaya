import { createApp } from 'vue';
import App from './App.vue';

// Import Bootstrap and BootstrapVue3 CSS
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap/dist/css/bootstrap.css';

// Import BootstrapVue3
import { BootstrapVue3, IconsPlugin } from 'bootstrap-vue-3';

const app = createApp(App)

// Use BootstrapVue3 in the app
app.use(BootstrapVue3)
app.use(IconsPlugin)

app.mount('#app')
