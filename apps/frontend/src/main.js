import { createApp } from 'vue'
import App from './App.vue'
import { VueQueryPlugin } from 'vue-query'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: () => import('./pages/Map.vue') },
        { path: '/info', component: () => import('./pages/Info.vue') },
    ],
})

const app = createApp(App)

app.use(VueQueryPlugin)
app.use(router)

app.mount('#app')
