// import flags BEFORE Vue / i18n are used
import './intlify-flags.js'

import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { renderToString } from '@vue/server-renderer'
import { createApp } from '../apps/site/src/adapter.js'
import { buildHead } from './seoHead.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicDir = path.resolve(__dirname, '../public')

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
  // Parse simples de Accept-Language com suporte a q=
  // Ex.: "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7"
  const supported = ['pt-BR', 'en']
  if (!accept) return 'en'

  const prefs = accept.split(',')
    .map(s => s.trim())
    .map((entry, idx) => {
      const [tagRaw, ...params] = entry.split(';').map(x => x.trim())
      const tag = tagRaw.toLowerCase()
      const qParam = params.find(p => p.startsWith('q='))
      const q = qParam ? parseFloat(qParam.slice(2)) : 1.0
      // normaliza para os suportados
      let norm = null
      if (tag === 'pt-br' || tag === 'pt') norm = 'pt-BR'
      else if (tag === 'en' || tag.startsWith('en-')) norm = 'en'
      return { norm, q, idx }
    })
    .filter(x => x.norm && supported.includes(x.norm))
    // ordena por q desc; em empate, pela ordem de aparição (idx asc)
    .sort((a, b) => b.q - a.q || a.idx - b.idx)

  return prefs[0]?.norm || 'pt-BR'
}

const server = http.createServer(async (req, res) => {
  const urlPath = (req.url || '/').split('?')[0]

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
  if (urlPath === '/healthz') {
    res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' })
    return res.end('ok')
  }

  // robots.txt
  if (urlPath === '/robots.txt') {
    const robots =
      ROBOTS_ALLOW === 'none'
        ? 'User-agent: *\nDisallow: /\n'
        : `User-agent: *\nAllow: /\nSitemap: ${BASE_URL}/sitemap.xml\n`
    res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' })
    return res.end(robots)
  }

  if (
    urlPath === '/favicon.ico' ||
    urlPath === '/favicon-32x32.png' ||
    urlPath === '/favicon-16x16.png' ||
    urlPath === '/apple-touch-icon.png'
  ) {
    const fileName = urlPath.replace(/^\/+/, '')
    const filePath = path.join(publicDir, fileName)

    const contentType =
      fileName.endsWith('.ico') ? 'image/x-icon'
      : fileName.endsWith('.png') ? 'image/png'
      : 'application/octet-stream'

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
        return res.end('Not found')
      }
      res.writeHead(200, { 'content-type': contentType })
      return res.end(data)
    })
    return
  }

  if (urlPath === '/sitemap.xml') {
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

if (urlPath.startsWith('/assets/')) {
  const filePath = path.join(publicDir, urlPath.replace(/^\/+/, ''))

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
      return res.end('Not found')
    }

    const contentType =
      urlPath.endsWith('.js')
        ? 'text/javascript; charset=utf-8'
        : urlPath.endsWith('.css')
          ? 'text/css; charset=utf-8'
          : 'application/octet-stream'

    res.writeHead(200, { 'content-type': contentType })
    return res.end(data)
  })
  return
}



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
    path: urlPath || '/',
    lang: locale,
    hreflangs
  })

const html = `<!doctype html>
<html lang="${head.lang}">
  <head>
    ${head.htmlString}
    <link rel="stylesheet" href="/assets/style.css">
  </head>
  <body>
    <div id="app">${appHtml}</div>
    <script type="module" src="/assets/client.js"></script>
  </body>
</html>`


  const headers = { 'content-type': 'text/html; charset=utf-8' }
  if (CACHE_HTML_SECONDS > 0) headers['Cache-Control'] = `public, max-age=${CACHE_HTML_SECONDS}`

  res.writeHead(200, headers)
  res.end(html)
})

server.listen(port, () => {
  console.log(`🧬 vue-ssr-jod running at http://localhost:${port}`)
})
