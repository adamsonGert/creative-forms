import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewForm from '@/components/NewForm'
import EditForm from '@/components/EditForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-form',
      component: NewForm
    },
    {
      path: '/edit-form',
      name: 'edit-form',
      component: EditForm
    },
  ]
})
