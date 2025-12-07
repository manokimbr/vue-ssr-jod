// server/seoHead.js
/**
 * Head builder — centralizes title, description, canonical and social meta.
 * Includes i18n support via lang and hreflang alternates.
 */

function normalizePath(pathname) {
    if (!pathname || pathname === '/') return '/'
    const clean = String(pathname).replace(/[#?].*$/, '').replace(/\/{2,}/g, '/')
    return clean || '/'
  }
  
  function joinUrl(baseUrl, path) {
    const u = new URL(baseUrl)
    const p = normalizePath(path)
    if (p === '/') return `${u.origin}/`
    return `${u.origin}${p.startsWith('/') ? p : `/${p}`}`
  }
  
  // Boilerplate defaults (safe to customize for your project)
  const DEFAULTS = {
    title: 'vue-ssr-jod — SEO-ready SSR boilerplate',
    description:
      'Minimal Vue 3 + Node.js SSR setup, optimized for indexing and easy to adapt to any project that needs to rank on search engines.',
    keywords: 'vue 3, node.js, ssr, seo, boilerplate, open source'
  }
  
  /**
   * @param {object} opts
   * @param {string} opts.baseUrl - site origin (e.g., https://www.example.com)
   * @param {string} [opts.path='/'] - current path
   * @param {string} [opts.lang='pt-BR'] - current language (BCP47, e.g., 'pt-BR', 'en')
   * @param {Array<{lang:string, path?:string}>} [opts.hreflangs=[]] - alternate locales
   * @param {object} [opts.override] - per-route overrides (title/description/canonicalPath)
   * @param {Array<{name:string, content:string, prop?:boolean}>} [opts.metaExtras] - extra meta tags
   */
  export function buildHead({
    baseUrl,
    path = '/',
    lang = 'pt-BR',
    hreflangs = [],
    override = {},
    metaExtras = []
  } = {}) {
    const cleanPath = normalizePath(path)
    const title = (override.title || DEFAULTS.title).trim()
    const description = (override.description || DEFAULTS.description).trim()
    let keywords = override.keywords || DEFAULTS.keywords
    if (Array.isArray(keywords)) {
      keywords = keywords.join(', ')
    }
    keywords = keywords.trim()
    const canonicalHref = joinUrl(baseUrl, override.canonicalPath || cleanPath)
  
    const social = [
      { name: 'og:type', content: 'website', prop: true },
      { name: 'og:title', content: title, prop: true },
      { name: 'og:description', content: description, prop: true },
      { name: 'og:url', content: canonicalHref, prop: true },
      { name: 'twitter:card', content: 'summary_large_image' }
    ]
  
    const allMetas = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      ...social,
      ...metaExtras
    ]
  
    const metaTags = allMetas
      .filter((m) => m && m.content)
      .map((m) =>
        m.prop
          ? `<meta property="${escapeHtml(m.name)}" content="${escapeHtml(m.content)}">`
          : `<meta name="${escapeHtml(m.name)}" content="${escapeHtml(m.content)}">`
      )
      .join('\n    ')
  
    const alternateLinks = hreflangs
      .map((alt) => {
        const href = joinUrl(baseUrl, alt.path ?? cleanPath)
        return `<link rel="alternate" hreflang="${escapeHtml(alt.lang)}" href="${escapeHtml(href)}">`
      })
      .join('\n    ')
  
    const head = `\
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>${escapeHtml(title)}</title>
      <link rel="canonical" href="${escapeHtml(canonicalHref)}">

      <link rel="icon" href="/favicon.ico">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

      ${metaTags}
      ${alternateLinks}`
  
    return {
      title,
      description,
      canonicalHref,
      lang,
      htmlString: head
    }
  }
  
  function escapeHtml(str = '') {
    return String(str)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;')
  }
  