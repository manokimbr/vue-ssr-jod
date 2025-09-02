import http from 'node:http'
import { renderToString } from '@vue/server-renderer'
import { createApp } from '../apps/site/src/adapter.js'
import { buildHead } from './seoHead.js'

const port = process.env.PORT
const BASE_URL = process.env.BASE_URL

const CANONICAL_HOST = process.env.CANONICAL_HOST || (new URL(BASE_URL)).host
const FORCE_HTTPS = String(process.env.FORCE_HTTPS).toLowerCase() === 'true'
const FORCE_WWW = String(process.env.FORCE_WWW).toLowerCase() === 'true'
const CACHE_HTML_SECONDS = Number(process.env.CACHE_HTML_SECONDS || 0)
const ROBOTS_ALLOW = (process.env.ROBOTS_ALLOW || 'all').toLowerCase()

function toWww(hostname) {
  return hostname.startsWith('www.') ? hostname : `www.${hostname}`
}
function toRoot(hostname) {
  return hostname.startsWith('www.') ? hostname.slice(4) : hostname
}
function isLocalHost(host = '') {
  const h = host.split(':')[0]
  return h === 'localhost' || h === '127.0.0.1'
}
function pickLocale(accept = '') {
  // very simple: if header contains "en", return "en"; otherwise default to "pt-BR"
  return /(^|,|\s)en(-|;|,|$)/i.test(accept || '') ? 'en' : 'pt-BR'
}

const server = http.createServer(async (req, res) => {
  // --- Canonicalization middleware ---
  const incomingHost = (req.headers['host'] || '').split(':')[0]
  const forwardedProto = (req.headers['x-forwarded-proto'] || 'http').split(',')[0].trim()
  let targetHost = CANONICAL_HOST

  targetHost = FORCE_WWW ? toWww(targetHost) : toRoot(targetHost)
  const needHttps = FORCE_HTTPS && forwardedProto !== 'https'
  const needHost = incomingHost && incomingHost !== targetHost

  if (!isLocalHost(incomingHost) && (needHttps || needHost)) {
    const scheme = FORCE_HTTPS ? 'https' : (forwardedProto || 'https')
    const location = `${scheme}://${targetHost}${req.url || '/'}`
    res.writeHead(301, {
      Location: location,
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0'
    })
    return res.end(`Redirecting to ${location}\n`)
  }

  // health check
  if (req.url === '/healthz') {
    res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' })
    return res.end('ok')
  }

  // robots.txt
  if (req.url === '/robots.txt') {
    const robots =
      ROBOTS_ALLOW === 'none'
        ? 'User-agent: *\nDisallow: /\n'
        : `User-agent: *\nAllow: /\nSitemap: ${BASE_URL}/sitemap.xml\n`
    res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' })
    return res.end(robots)
  }

  // sitemap.xml (for now only homepage; can be extended with more routes)
  if (req.url === '/sitemap.xml') {
    const now = new Date().toISOString()
    const urls = ['']
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `
  <url>
    <loc>${BASE_URL}${u}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u === '' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('')}
</urlset>`
    res.writeHead(200, { 'content-type': 'application/xml; charset=utf-8' })
    return res.end(xml)
  }

  // --- i18n: decide locale based on Accept-Language header ---
  const locale = pickLocale(req.headers['accept-language'])

  // --- SSR ---
  const app = createApp({ locale })
  const appHtml = await renderToString(app)

  // basic hreflangs for pt-BR and en (same path)
  const hreflangs = [
    { lang: 'pt-BR' },
    { lang: 'en' }
  ]

  const head = buildHead({
    baseUrl: BASE_URL,
    path: req.url || '/',
    lang: locale,
    hreflangs
  })

  const html = `<!doctype html>
<html lang="${head.lang}">
  <head>
    ${head.htmlString}
  </head>
  <body><div id="app">${appHtml}</div></body>
</html>`

  const headers = { 'content-type': 'text/html; charset=utf-8' }
  if (CACHE_HTML_SECONDS > 0) headers['Cache-Control'] = `public, max-age=${CACHE_HTML_SECONDS}`

  res.writeHead(200, headers)
  res.end(html)
})

server.listen(port, () => {
  console.log(`🧬 vue-ssr-jod running at http://localhost:${port}`)
})
