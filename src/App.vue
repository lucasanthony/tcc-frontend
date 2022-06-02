<script setup></script>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
  },

  computed: {
    showSidebar() {
      return this.$store.state.sidebar.show
    },
  },
}
</script>

<template lang="pug">
sidebar(
  v-if="showSidebar"
)
router-view.float-right(
  :style="!showSidebar ? 'width: 100vw' : 'width: 90vw'"
)
</template>

<style>
.float-right {
  width: 90vw;
  float: right;
}
</style>
