import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 个人信息
  {
    path: '/',
    name: 'personalInfo',
    component: () => import('../views/personalInfo.vue')
  },
  // 上传图片
  {
    path: '/uploadAttach',
    name: 'uploadAttach',
    component: () => import('../views/uploadAttach.vue')
  },
  // 预览
  {
    path: '/afterSubmit',
    name: 'afterSubmit',
    component: () => import('../views/afterSubmit.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
