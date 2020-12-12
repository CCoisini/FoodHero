import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Home from '@/views/home/Home.vue'   // 引入组件 打包会打包在文件中，如果都用import的话，所有组件都会打包在一个文件中

const Login = () => import( '@/views/user-login/index');

// 按需加载，访问路径的时候才会加载，不访问，不加载
const Space = () => import ('@/views/user-space/space')
const Create = () => import ('@/views/create/create')
const Recipe = () => import ('@/views/recipe/recipe')

const viewsRoute = [
  {
    path:'/space',
    title:'个人空间',
    name:'space',
    component:Space,
  },
  {
    path:'/create',
    title:'发布菜谱',
    name:'create',
    component:Create,
  },
  {
    path:'/recipe',
    title:'菜谱大全',
    name:'recipe',
    component:Recipe,
  },

]





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
      ...viewsRoute,
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