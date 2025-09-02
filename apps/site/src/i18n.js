// apps/site/src/i18n.js
import { createI18n } from 'vue-i18n'

const messages = {
  'pt-BR': {
    hero: {
      title: 'BrazilianDev — Aprenda programação, trabalhe remoto e ganhe em dólar',
      lead:
        'Guia direto ao ponto: primeiros passos em programação, portfólio, LinkedIn, entrevistas e SEO para aparecer no Google.'
    },
    cta: { github: 'Ver no GitHub' }
  },
  en: {
    hero: {
      title: 'BrazilianDev — Learn to code, work remotely, and earn in USD',
      lead:
        'Straightforward guide: first steps in coding, portfolio, LinkedIn, interviews, and SEO to show up on Google.'
    },
    cta: { github: 'View on GitHub' }
  }
}

export function createI18nInstance(locale = 'pt-BR') {
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en',
    messages
  })
}
