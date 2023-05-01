import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index'

//配置路由组件，页面跳转
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/itemMusic',
    name: 'ItemMusic',
    // route level code-splitting
    // this generates a separate chunk (ItemMusic.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ItemMusic" */ '../views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'SearCh',
    // route level code-splitting
    // this generates a separate chunk (SearCh.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "SearCh" */ '../views/SearCh.vue')
  },
  {
    path: '/login',
    name: 'LoGin',
    // route level code-splitting
    // this generates a separate chunk (LoGin.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "LoGin" */ '../views/LoGin.vue')
  }, {
    path: '/infouser',
    name: 'InfoUser',
    //路由守卫，如果登录了，就允许进入InfoUser，没有登录，就返回到登录页面
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin) {
        next()
      } else {
        next('/login')
      }
    },
    // route level code-splitting
    // this generates a separate chunk (InfoUser.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "InfoUser" */ '../views/InfoUser.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


//路由全局首位，如果进入了login路由，就改变store里的布尔值，让底部音乐组件隐藏
router.beforeEach((to,from) => {
  if (to.path == '/login') {
    store.state.isFooterMusic = false
  } else {
    store.state.isFooterMusic = true
  }
})

export default router
