import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [{
  path: '/',
  redirect: '/index',
  name: 'main',
  meta: {
    title: '首页',
  },
  children: [
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/index.vue'),
      meta: {
        title: '首页',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        title: '登录',
      },
    },
  ],
}]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
