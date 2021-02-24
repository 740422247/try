import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = () => import(/* webpackChunkName: "group-HelloWorld" */ '@/components/HelloWorld')
const Comp = () => import(/* webpackChunkName: "group-Comp" */ '@/components/component')
const Notifycation = () => import(/* webpackChunkName: "group-Notifycation" */ '@/components/notifycation')
const Home = () => import(/* webpackChunkName: "group-Home" */ '@/components/home')
const Purdah = () => import(/* webpackChunkName: "group-Purdah" */ '@/components/purdah')
const Calender = () => import(/* webpackChunkName: "group-Calender" */ '@/components/Calender')
const Bar = () => import(/* webpackChunkName: "group-Calender" */ '@/components/Bar')
const Pie = () => import(/* webpackChunkName: "group-Calender" */ '@/components/Pie')
const StarSky = () => import(/* webpackChunkName: "group-Calender" */ '@/components/StarSky')
const Snow = () => import(/* webpackChunkName: "group-Calender" */ '@/components/snow')
const Bubble = () => import(/* webpackChunkName: "group-Calender" */ '@/components/Bubble')
const WebGl = () => import(/* webpackChunkName: "group-Calender" */ '@/components/three')
const Flow = () => import(/* webpackChunkName: "group-Calender" */ '@/components/flow')
const Map = () => import(/* webpackChunkName: "group-Calender" */ '@/components/map')
const ScreenPc = () => import(/* webpackChunkName: "group-Calender" */ '@/components/screenPc')
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Notifycation',
      name: 'Notifycation',
      component: Notifycation
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/comp',
      name: 'Comp',
      component: Comp
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/webgl',
      name: 'WebGl',
      component: WebGl
    },
    {
      path: '/purdah',
      name: 'Purdah',
      component: Purdah
    },
    {
      path: '/bar',
      name: 'Bar',
      component: Bar
    },
    {
      path: '/pie',
      name: 'Pie',
      component: Pie
    },
    {
      path: '/starSky',
      name: 'StarSky',
      component: StarSky
    },
    {
      path: '/snow',
      name: 'Snow',
      component: Snow
    },
    {
      path: '/screenPc',
      name: 'ScreenPc',
      component: ScreenPc
    },
    {
      path: '/bubble',
      name: 'Bubble',
      component: Bubble
    },
    {
      path: '/flow',
      name: 'Flow',
      component: Flow
    },

    {
      path: '/calender',
      name: 'Calender',
      component: Calender
    }
  ]
})
