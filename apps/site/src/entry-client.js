// apps/site/src/entry-client.js
import 'vuetify/styles'

import { createApp } from './adapter.js'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './config/languages.js'
import { theme } from './vuetify.js'

const htmlLang = document.documentElement.lang || DEFAULT_LOCALE
const locale = SUPPORTED_LOCALES.includes(htmlLang) ? htmlLang : DEFAULT_LOCALE

const { app, router } = createApp({ locale })

const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
theme.defaultTheme = isDark ? 'dark' : 'light'

const vuetify = createVuetify({
  components,
  directives,
  theme,
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

console.log('Client entry executing...')

router.isReady().then(() => {
  console.log('Router is ready. Mounting app...')
  try {
    app.mount('#app')
    console.log('App mounted successfully.')
  } catch (e) {
    console.error('Error during app.mount():', e)
  }

  if (window.__HYDRATION_COMPLETE__) {
    console.log('Calling __HYDRATION_COMPLETE__')
    window.__HYDRATION_COMPLETE__()
  } else {
    console.error('window.__HYDRATION_COMPLETE__ is missing!')
  }
}).catch(err => {
  console.error('Error in router.isReady():', err)
})
