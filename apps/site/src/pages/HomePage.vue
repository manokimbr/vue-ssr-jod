<template>
  <main class="container" :style="baseStyle">
    <h1>{{ $t('hero.title') }}</h1>
    <p>{{ $t('hero.lead') }}</p>

    <a
      href="https://github.com/manokimbr/vue-ssr-jod"
      target="_blank"
      rel="noopener"
    >
      {{ $t('cta.github') }}
    </a>
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
