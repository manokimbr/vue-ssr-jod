// apps/site/src/i18n.js
import { createI18n } from 'vue-i18n'

const messages = {
  'pt-BR': {
    hero: {
      title: 'BrazilianDev — Aprenda programação, trabalhe remoto e ganhe em dólar',
      lead:
        'Guia direto ao ponto: primeiros passos em programação, portfólio, LinkedIn, entrevistas e SEO para aparecer no Google.'
    },
    cta: { github: 'Ver no GitHub' },
    about: {
      title: 'Sobre o BrazilianDev',
      description: 'BrazilianDev — boilerplate híbrido SSR/CSR vue-ssr-jod, focado em SEO, trabalho remoto e ganhar em dólar.'
    }
  },
  en: {
    hero: {
      title: 'BrazilianDev — Learn to code, work remotely, and earn in USD',
      lead:
        'Straightforward guide: first steps in coding, portfolio, LinkedIn, interviews, and SEO to show up on Google.'
    },
    cta: { github: 'View on GitHub' },
    about: {
      title: 'About BrazilianDev',
      description: 'BrazilianDev — vue-ssr-jod hybrid SSR/CSR boilerplate, focused on SEO, remote work and earning in USD.'
    }
  }
}

export function createI18nInstance(locale = 'pt-BR') {
  // Legacy + global injection so $t is available on app.config.globalProperties
  return createI18n({
    legacy: true,
    globalInjection: true,
    locale,
    fallbackLocale: 'en',
    messages
  })
}
