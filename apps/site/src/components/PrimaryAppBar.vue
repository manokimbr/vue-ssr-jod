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

    <VSpacer />

    <!-- Right-side action -->
    <VBtn
      variant="text"
      aria-label="github"
      href="https://github.com/manokimbr/vue-ssr-jod"
      target="_blank"
      rel="noopener"
    >
    <VIcon >mdi-github</VIcon >
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
