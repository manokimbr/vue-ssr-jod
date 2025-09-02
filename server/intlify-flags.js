// server/intlify-flags.js
// Define Vue / vue-i18n feature flags for a non-bundled Node SSR runtime.
// Must be imported BEFORE anything that uses vue/vue-i18n.

globalThis.__VUE_PROD_DEVTOOLS__ = false;
globalThis.__VUE_I18N_FULL_INSTALL__ = true;
globalThis.__VUE_I18N_LEGACY_API__ = true;   // we're using legacy mode to expose $t
globalThis.__INTLIFY_PROD_DEVTOOLS__ = false;
