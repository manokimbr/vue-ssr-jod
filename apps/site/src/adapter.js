// apps/site/src/adapter.js
import { createSSRApp } from 'vue'
import App from './App.vue'
import { createI18nInstance } from './i18n.js'
import { createRouterInstance } from './router.js'

export function createApp(ctx = {}) {
  const locale = ctx.locale || 'pt-BR'

  const app = createSSRApp(App)

  const i18n = createI18nInstance(locale)
  const router = createRouterInstance()

  app.use(i18n)
  app.use(router)

  // server and client both expect { app, router }
  return { app, router }
}
