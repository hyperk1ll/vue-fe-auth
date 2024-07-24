import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import '/src/index.css'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
