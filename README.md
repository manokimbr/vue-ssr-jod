# vue-ssr-jod

A minimal **Vue 3 + Node.js 22** SSR setup, built from scratch as part of the **JOD ecosystem**.
Designed to serve fast, SEO-optimized landing pages with a rich client-side Vuetify 3 experience.

---

## 🚀 Features

- **Hybrid SSR/CSR Architecture**:
    - **Server**: Renders semantic HTML, meta tags, and critical CSS for instant FCP and perfect SEO.
    - **Client**: Hydrates into a full Single Page Application (SPA) with Vuetify components and interactivity.
- **SEO Optimized**:
    - Dynamic `<title>`, `<meta>`, and `hreflang` generation.
    - Canonical URL handling (HTTPS/WWW enforcement).
    - `sitemap.xml` and `robots.txt` generation.
- **Performance**:
    - **Node 22 ESM**: Native ES modules on the server (no Webpack/Vite server bundle).
    - **Smart Hydration**: Custom loader prevents FOUC (Flash of Unstyled Content) and hydration mismatches.
    - **Caching**: Configurable HTML caching strategies.
- **Developer Experience**:
    - **JOD Introspection**: `npm run brain` analyzes project structure for AI agents.
    - **No Magic**: Transparent server logic using standard Node.js APIs.

---

## 🏗️ Architecture

### Server-Side (`server/`)
- **`index.js`**: The core HTTP server. Handles routing, locale detection, and renders the Vue app to a string.
- **`appLoader.js`**: Injects a lightweight loading screen that persists until hydration is complete, masking layout shifts.
- **`seoHead.js`**: Manages all head tags (title, meta, link) dynamically based on the current route and locale.

### Client-Side (`apps/site/`)
- **`entry-client.js`**: The entry point for the browser. Mounts the Vue app and initializes Vuetify.
- **`vuetify.js`**: Configures the UI framework, themes, and icons.
- **`components/`**: Shared Vue components used by both server and client.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 22+ (Required for native ESM support)

### Installation

```bash
npm install
```

### Development

Run the server in development mode (with live reload support via Vite for client assets):

```bash
npm run dev
```

### Production

Build the client assets and start the production server:

```bash
npm run build:client
npm start
```

### Introspection

Run the JOD introspection tool to generate a project structure snapshot for AI agents:

```bash
npm run brain
```
Output is saved to `jod/memory/structure.json`.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.