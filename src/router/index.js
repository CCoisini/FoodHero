import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Home from '@/views/home/Home.vue'   // 引入组件 打包会打包在文件中，如果都用import的话，所有组件都会打包在一个文件中

const Login = () => import( '@/views/user-login/index');

const router = new Router({
    mode: 'history',  // hash http://localhost:8081#home   http://localhost:8081/home
    routes: [
      {
        path: '/',
        name: 'home',
        title: '首页',
        component: Home
      },
      {
        path: '/login',
        name: 'login',
        title: '登录页',
        component: Login,
        meta: {
          login: true
        },
      },
    //   ...viewsRoute,
      {
        path: '*',
        name: 'noFound',
        title: '未找到',
        redirect: {
          name: 'home'
        }
      }
    ]
  })

export default router;