import { createSSRApp, h } from 'vue'

export function createApp() {
  return createSSRApp({
    render() {
      return h('h1', 'Hello from vue-ssr-jod 🚀')
    }
  })
}
