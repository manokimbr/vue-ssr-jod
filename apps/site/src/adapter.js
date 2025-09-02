// apps/site/src/adapter.js
import { createSSRApp, h } from 'vue'
import { createI18nInstance } from './i18n.js'

export function createApp(ctx = {}) {
  const locale = ctx.locale || 'pt-BR'
  const i18n = createI18nInstance(locale)

  const app = createSSRApp({
    render() {
      const t = i18n.global.t
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
