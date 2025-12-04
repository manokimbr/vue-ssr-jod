// apps/site/src/entry-client.js
import 'vuetify/styles'

import { createApp } from './adapter.js'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './config/languages.js'

const htmlLang = document.documentElement.lang || DEFAULT_LOCALE
const locale = SUPPORTED_LOCALES.includes(htmlLang) ? htmlLang : DEFAULT_LOCALE

const { app, router } = createApp({ locale })

const vuetify = createVuetify({
  components,
  directives,
})

app.use(vuetify)

// suppress expected hydration warning
const originalError = console.error
console.error = function (...args) {
  const msg = args[0]
  if (typeof msg === 'string' && msg.includes('Hydration completed but contains mismatches')) {
    return
  }
  originalError.apply(console, args)
}

router.isReady().then(() => {
  app.mount('#app')
})
