import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { ssrTransform } from 'vuetify/server'

export function createMyVuetify() {
  return createVuetify({
    components,
    directives,

    ssr: {
      transform: ssrTransform,
    },
  })
}
