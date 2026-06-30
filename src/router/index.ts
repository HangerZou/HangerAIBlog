import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/tutorials',
    name: 'Tutorials',
    component: () => import('@/views/TutorialsIndexPage.vue'),
  },
  {
    path: '/tutorials/:seriesKey',
    name: 'TutorialSeries',
    component: () => import('@/views/TutorialsPage.vue'),
  },
  {
    path: '/tutorials/:seriesKey/:slug',
    name: 'TutorialDetail',
    component: () => import('@/views/TutorialsPage.vue'),
    props: true,
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/BlogPage.vue'),
  },
  {
    path: '/blog/:slug',
    name: 'BlogDetail',
    component: () => import('@/views/BlogDetail.vue'),
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
