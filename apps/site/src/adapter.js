// apps/site/src/adapter.js
import { createSSRApp, h } from 'vue'
import { createI18nInstance } from './i18n.js'

export function createApp(ctx = {}) {
  const app = createSSRApp({
    render() {
      const t = app.config.globalProperties.$t
      return h('main', { class: 'container', style: baseStyle }, [
        h('h1', t('hero.title')),
        h('p', t('hero.lead')),
        h(
          'a',
          {
            href: 'https://github.com/manokimbr/vue-ssr-jod',
            target: '_blank',
            rel: 'noopener'
          },
          t('cta.github')
        )
      ])
    }
  })

  // i18n com locale vindo do server (ctx.locale)
  const i18n = createI18nInstance(ctx.locale || 'pt-BR')
  app.use(i18n)

  return app
}

const baseStyle = `
  max-width: 720px;
  margin: 48px auto;
  padding: 0 16px;
  line-height: 1.6;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
`
