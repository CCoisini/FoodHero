import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import {userInfo} from '@/service/api';
import Store from '@/store'

import Home from '@/views/home/Home.vue'   // 引入组件 打包会打包在文件中，如果都用import的话，所有组件都会打包在一个文件中，导致文件很大

// 按需加载，访问路径的时候才会加载，不访问，不加载

const Recipe = () => import( '@/views/recipe/recipe' );
const Create = () => import( '@/views/create/create' );
const Edit = () => import( '@/views/user-space/edit' );

const Space = () => import( /* webpackChunkName: "space" */ '@/views/user-space/space');
const MenuList = () => import( /* webpackChunkName: "space" */ '@/views/user-space/menu-list');
const Fans = () => import( /* webpackChunkName: "space" */ '@/views/user-space/fans');

const Detail = () => import( '@/views/detail/detail');
const Login = () => import( '@/views/user-login/index');

const viewsRoute = [
  {
    path: '/recipe',
    name: 'recipe',
    title: '菜谱大全',
    component: Recipe
  },
  {
    path: '/create',
    name: 'create',
    title: '发布菜谱',
    component: Create,
    meta: {
      login: true
    }
  },
  {
    path: '/edit',
    title: '编辑个人资料',
    name: 'edit',
    meta: {login: true},
    component: Edit
  },
  {
    path: '/space',
    title: '个人空间',
    name: 'space',
    component: Space,
    redirect: {
      name: 'works'
    },
    meta: {
      login: true
    },
    children: [
      {
        path: 'works',
        name: 'works',
        title: '作品',
        component: MenuList,
        meta: {
          login: true
        },
      },
      {
        path: 'fans',
        name: 'fans',
        title: '我的粉丝',
        component: Fans,
        meta: {
          login: true
        },
      },
      {
        path: 'following',
        name: 'following',
        title: '我的关注',
        component: Fans,
        meta: {
          login: true
        },
      },
      {
        path: 'collection',
        name: 'collection',
        title: '收藏',
        component: MenuList,
        meta: {
          login: true
        },
      }
    ]
  },
  {
    path: '/detail',
    name: 'detail',
    title: '菜谱细节',
    component: Detail
  }
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

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  const isLogin = !!token;

  // 进入路由的时候，都要想后端发送token,验证合法不合法
  // 不管路由需要不需要登录，都需要展示用户信息
  // 都需要想后端发请求，拿到用户信息
  const data = await userInfo();
  Store.commit('chnageUserInfo', data.data);
  if(to.matched.some(item => item.meta.login)){  // 需要登录，判断登录状态
    if(isLogin) {
      if(data.error === 400){  // 后端告诉你，登录没成功
        next({name: 'login'});
        localStorage.removeItem('token');
        return;
      }
      if(to.name === 'login'){
        next({name: 'home'})
      }else {
        next();
      }
      return;
    }
    // 没登录，进入login，直接进入
    if(!isLogin && to.name === 'login'){
      next();
    }
    // 没登录，进入的不是login，跳到login
    if(!isLogin && to.name !== 'login'){
      next({name: 'login'})
    }
    
    
  }else {
    next();
  }

  
})


export default router;