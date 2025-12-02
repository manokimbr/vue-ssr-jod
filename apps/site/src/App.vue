<template>
  <VApp>
    <PrimaryAppBar
      title="BRAZILIANDEV"
      @toggle-drawer="toggleDrawer"
    />

    <VNavigationDrawer v-model="drawer" temporary>
      <VList>
        <VListItem to="/" link>
          <VListItemTitle>Home</VListItemTitle>
        </VListItem>
        <VListItem to="/about" link>
          <VListItemTitle>About</VListItemTitle>
        </VListItem>
      </VList>
    </VNavigationDrawer>

    <VMain>
      <RouterView />
    </VMain>
  </VApp>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import PrimaryAppBar from './components/PrimaryAppBar.vue'

const drawer = ref(false)

const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<style scoped>
/* layout-level styles if needed */
</style>
