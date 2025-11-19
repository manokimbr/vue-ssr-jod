// apps/site/src/adapter.js
import { createSSRApp } from 'vue'
import { createI18nInstance } from './i18n.js'
import App from './App.vue'

export function createApp(ctx = {}) {
  const locale = ctx.locale || 'pt-BR'
  const i18n = createI18nInstance(locale)

  const app = createSSRApp(App)

  app.use(i18n)
  return app
}
