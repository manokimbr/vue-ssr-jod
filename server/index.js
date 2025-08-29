import http from 'node:http'
import { renderToString } from '@vue/server-renderer'
import { createApp } from '../apps/site/src/adapter.js'

const port = process.env.PORT || 3000
const BASE_URL = process.env.BASE_URL || 'https://braziliandev.com'

const server = http.createServer(async (req, res) => {
  // health check
  if (req.url === '/healthz') {
    res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' })
    return res.end('ok')
  }

  // robots.txt
  if (req.url === '/robots.txt') {
    const robots = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml
`
    res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' })
    return res.end(robots)
  }

  // sitemap.xml (por enquanto só a home; depois adicionamos outras rotas)
  if (req.url === '/sitemap.xml') {
    const now = new Date().toISOString()
    const urls = [''] // '' = homepage
    const xml =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `
  <url>
    <loc>${BASE_URL}${u}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`
    res.writeHead(200, { 'content-type': 'application/xml; charset=utf-8' })
    return res.end(xml)
  }

  // SSR padrão
  const app = createApp()
  const appHtml = await renderToString(app)
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>BrazilianDev — Vue 3 SSR, Node 22</title>
    <meta name="description" content="Conteúdo PT/EN sobre SSR, SEO e carreira remota para devs.">
    <link rel="canonical" href="${BASE_URL}/">
    <meta property="og:title" content="BrazilianDev">
    <meta property="og:description" content="Guia prático de SSR/SEO e conteúdo para devs.">
    <meta property="og:url" content="${BASE_URL}/">
    <meta name="twitter:card" content="summary_large_image">
  </head>
  <body><div id="app">${appHtml}</div></body>
</html>`
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
  res.end(html)
})

server.listen(port, () => {
  console.log(`🧬 vue-ssr-jod running at http://localhost:${port}`)
})
