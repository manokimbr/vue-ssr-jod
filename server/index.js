import http from 'node:http'
import { renderToString } from '@vue/server-renderer'
import { createApp } from '../apps/site/src/adapter.js'

const port = process.env.PORT
const BASE_URL = process.env.BASE_URL

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
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>BrazilianDev — Como aprender programação, trabalhar remoto e ganhar em dólar</title>
    <meta name="description" content="Aprenda programação do zero e transforme sua carreira: passo a passo para conseguir trabalho remoto e ganhar em dólar. Conteúdos práticos sobre JavaScript para iniciantes, front-end, back-end, portfólio, LinkedIn, entrevistas e SEO básico para fazer seu site aparecer no Google e DuckDuckGo.">
    <link rel="canonical" href="${BASE_URL}/">

    <!-- keywords (amplas e aspiracionais) -->
    <meta name="keywords" content="aprender programação, como programar, programação do zero, curso de programação, desenvolvedor iniciante, primeiro emprego dev, junior developer, trabalho remoto, ganhar em dólar, freelancer, portfólio GitHub, LinkedIn para devs, currículo para programador, JavaScript para iniciantes, front-end, back-end, carreira de programação, como virar programador, vagas remotas, entrevistas de emprego, estudar programação, roadmap dev, HTML CSS JavaScript, aprender a codar, aprender a programar online, aprender programação rápido, sem faculdade, bootcamp, começar na programação, dev no exterior, remote job, dolar, como ganhar em dolar programando, SEO para iniciantes, aparecer no Google, DuckDuckGo, Google Search">

    <!-- social preview básico -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="BrazilianDev — Aprender programação, trabalhar remoto e ganhar em dólar">
    <meta property="og:description" content="Guia simples para iniciantes: como começar a programar, montar portfólio, conseguir trabalho remoto e ganhar em dólar.">
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
