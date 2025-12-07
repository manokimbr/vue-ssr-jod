// apps/site/src/pageStyles.js
export const basePageStyle = `
  max-width: 720px;
  margin: 48px auto;
  padding: 0 16px;
  line-height: 1.6;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
    Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
`
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