<template>
  <main class="container" :style="baseStyle">
    <h1>{{ $t('about.title') }}</h1>
    <p>
      {{ $t('about.description') }}
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
