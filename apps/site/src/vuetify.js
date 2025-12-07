// apps/site/src/vuetify.js
import { createVuetify } from 'vuetify'

export const theme = {
  defaultTheme: 'dark',
  themes: {
    light: {
      dark: false,
      colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#6200EE',
        secondary: '#03DAC6',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
    },
    dark: {
      dark: true,
      colors: {
        background: '#121212',
        surface: '#212121',
        primary: '#BB86FC',
        secondary: '#03DAC6',
        error: '#CF6679',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
    },
  },
}

export function createMyVuetify(options = {}) {
  return createVuetify({
    theme,
    ...options,
  })
}
