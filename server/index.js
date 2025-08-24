import http from 'node:http'
import { renderToString } from '@vue/server-renderer'
import { createApp } from '../apps/site/src/adapter.js'

const port = process.env.PORT || 3000

const server = http.createServer(async (req, res) => {
  // health check primeiro
  if (req.url === '/healthz') {
    res.writeHead(200, { 'content-type': 'text/plain' })
    return res.end('ok')
  }

  // SSR padrão
  const app = createApp()
  const appHtml = await renderToString(app)
  const html = `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>vue-ssr-jod</title></head>
  <body><div id="app">${appHtml}</div></body>
</html>`
  res.writeHead(200, { 'content-type': 'text/html' })
  res.end(html)
})

server.listen(port, () => {
  console.log(`🧬 vue-ssr-jod running at http://localhost:${port}`)
})
