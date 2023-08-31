import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'home',
  component: () => import('@/views/index.vue'),
  meta: {
    title: '首页',
  }
}, {
  path: "/electron",
  name: 'electron-index',
  meta: {
    title: 'electron',
  },
  children: [{
    path: "/electron/copy-text",
    name: 'electron-copy-text',
    component: () => import('@/views/electron/copy-text.vue'),
    meta: {
      title: '复制文字',
    },
  }]
}]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
