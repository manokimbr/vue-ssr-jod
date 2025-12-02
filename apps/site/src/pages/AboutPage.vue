<template>
  <main class="container" :style="baseStyle">
    <h1>About BrazilianDev</h1>
    <p>
      BrazilianDev — vue-ssr-jod hybrid SSR/CSR boilerplate,
      focused on SEO, remote work and earning in USD.
    </p>
  </main>
</template>

<script setup>
import { basePageStyle } from '../pageStyles.js'
const baseStyle = basePageStyle
</script>

<style scoped>
.container {
}
</style>
