// apps/site/src/router.js
import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import AboutPage from './pages/AboutPage.vue'

import { SUPPORTED_LOCALES } from './config/languages.js'

const localeSegment = `/:locale(${SUPPORTED_LOCALES.join('|')})?`

const routes = [
  { path: `${localeSegment}/`, name: 'home', component: HomePage },
  { path: `${localeSegment}/about`, name: 'about', component: AboutPage },
]

export function createRouterInstance(base = '/') {
  const isServer = typeof window === 'undefined'

  const history = isServer
    ? createMemoryHistory(base)
    : createWebHistory(base)

  return createRouter({
    history,
    routes,
  })
}
