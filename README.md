# vue-ssr-jod

A minimal **Vue 3 + Node.js 22** SSR setup, handwritten from scratch as part of the **JOD ecosystem**.  
Built to serve fast, SEO-optimized landing pages with client-side Vuetify styling.

---

## Overview

`vue-ssr-jod` provides a lightweight, framework-free SSR renderer for Vue 3:

### Server-side
- `<title>`, `<meta>`, canonical and hreflang generation  
- Locale detection via `Accept-Language`  
- Sitemap + robots.txt  
- HTTPS/WWW canonicalization  
- Native Node 22 ESM server (no bundlers)  
- JOD introspection (`npm run brain`)

### Client-side
- Full Vuetify 3 UI (CSS, components, interactivity)  
- Hydration on top of SSR semantic HTML  
- SEO-correct initial render

---

## Rendering Model

This project uses a **hybrid SSR/CSR architecture**:

> **SSR handles SEO and content.**  
> **CSR handles layout, styling, and UI components.**

On the server, Vuetify components are not fully resolved.  
On the client, Vuetify mounts normally and applies full styling and DOM structure.

This is the intended behavior for this project’s goals:
- Minimal SSR surface  
- Full SEO coverage  
- Full Vuetify experience on the client  
- No Node CSS loaders or complex SSR pipelines

No functionality, styling, or SEO integrity is affected.