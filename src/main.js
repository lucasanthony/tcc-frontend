import { createApp } from "vue";
import App from "./App.vue";
import VueTheMask from 'vue-the-mask'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import store from './store'
import './index.css'

const app = createApp(App);

app.use(VueTheMask)
app.use(ElementPlus)
app.use(router)
app.use(store)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')