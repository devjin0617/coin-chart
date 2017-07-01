import Vue from 'vue'
import Router from 'vue-router'
import ChartView from '@/components/ChartView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ChartView',
      component: ChartView
    }
  ]
})
