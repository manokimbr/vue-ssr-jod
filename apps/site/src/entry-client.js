// apps/site/src/entry-client.js
import 'vuetify/styles' // CSS bundled by Vite for the browser

import { createSSRApp } from 'vue'
import App from './App.vue'
import { createI18nInstance } from './i18n.js'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const htmlLang = document.documentElement.lang || 'en'
const locale =
  htmlLang === 'pt-BR' || htmlLang === 'pt'
    ? 'pt-BR'
    : 'en'

const app = createSSRApp(App)

const i18n = createI18nInstance(locale)
const vuetify = createVuetify({
  components,
  directives,
})

app.use(i18n)
app.use(vuetify)

// Hydrate SSR HTML in #app
// Suppress expected hydration mismatch warning (intentional in hybrid SSR/CSR)
const originalError = console.error
console.error = function (...args) {
  const msg = args[0]
  if (typeof msg === 'string' && msg.includes('Hydration completed but contains mismatches')) {
    return
  }
  originalError.apply(console, args)
}

app.mount('#app')
