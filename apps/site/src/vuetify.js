// apps/site/src/vuetify.js
import { createVuetify } from 'vuetify'

export function createMyVuetify() {
  // minimal instance, no CSS, no components registration on the server
  return createVuetify()
}
