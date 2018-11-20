import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import content from '@/components/entrance'
import userList from '@/components/user/user-list'
import role from '@/components/user/role'
import enterprise from '@/components/enterprise/enterprise'
import imageIdentification from '@/components/imageIdentification/imageIdentification'
import product from '@/components/OneNET/product'
import project from '@/components/OneNET/project'
import upgrade from '@/components/upgrade/upgrade'
import log from '@/components/log/log'
import none from '@/components/404/404'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/404',
      name: 'none',
      component: none
    },
    {
      path: '/entrance',
      name: 'entrance',
      component: content,
      children: [
        {
          path: 'userList',
          name: 'userList',
          component: userList
        },
        {
          path: 'role',
          name: 'role',
          component: role
        },
        {
          path: 'enterprise',
          name: 'enterprise',
          component: enterprise
        },
        {
          path: 'imageIdentification',
          name: 'imageIdentification',
          component: imageIdentification
        },
        {
          path: 'product',
          name: 'product',
          component: product
        },
        {
          path: 'project',
          name: 'project',
          component: project
        },
        {
          path: 'upgrade',
          name: 'upgrade',
          component: upgrade
        },
        {
          path: 'log',
          name: 'log',
          component: log
        }
      ]
    }
    // , { path: '/*', redirect: '/404' }
  ]
})
