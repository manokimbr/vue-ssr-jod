// apps/site/src/adapter.js
import { createSSRApp } from 'vue'
import { createI18nInstance } from './i18n.js'
import App from './App.vue'
import { createMyVuetify } from './vuetify.js'

export function createApp(ctx = {}) {
  const app = createSSRApp(App)

  const i18n = createI18nInstance(ctx.locale || 'pt-BR')
  const vuetify = createMyVuetify()

  app.use(i18n)
  app.use(vuetify)

  // server/index.js expects the app instance
  return app
}
