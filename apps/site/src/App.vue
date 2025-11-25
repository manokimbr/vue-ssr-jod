<template>
  <VApp>
    <VMain>
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

        <div style="margin-top: 24px;">
          <VBtn color="primary" variant="flat" @click="handleClick">
            Vuetify is working ({{ count }})
          </VBtn>
        </div>
      </main>
    </VMain>
  </VApp>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
const handleClick = () => {
  count.value++
}

const baseStyle = `
  max-width: 720px;
  margin: 48px auto;
  padding: 0 16px;
  line-height: 1.6;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
    Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
`
</script>

<style scoped>
.container {
}
</style>
