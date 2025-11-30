<!-- apps/site/src/components/PrimaryAppBar.vue -->
<template>
  <VAppBar
    color="primary"
    density="comfortable"
    elevation="1"
  >
    <!-- Logo button = drawer toggle -->
    <VBtn
      icon
      variant="text"
      class="mr-3"
      @click="$emit('toggle-drawer')"
    >
      <img
        src="/favicon-32x32.png"
        alt="vue-ssr-jod logo"
        width="24"
        height="24"
        style="border-radius: 6px;"
      />
    </VBtn>

    <!-- Title + subline -->
    <div class="d-flex flex-column">
      <span class="text-subtitle-1 font-weight-medium">
        {{ title }}
      </span>
      <span class="text-caption text-white text-high-emphasis">
        vue-ssr-jod: Hybrid SSR/CSR · Fast, semantic, SEO-ready Vue
      </span>
    </div>

    <VSpacer />

    <!-- Right-side action -->
    <VBtn
      variant="text"
      href="https://github.com/manokimbr/vue-ssr-jod"
      target="_blank"
      rel="noopener"
    >
      GitHub
    </VBtn>
  </VAppBar>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'vue-ssr-jod',
  },
})

defineEmits(['toggle-drawer'])
</script>
