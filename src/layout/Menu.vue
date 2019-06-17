<template>

  <v-navigation-drawer
    app
    temporary
    right
    v-model="toolbar">
  </v-navigation-drawer>

</template>

<script>

  import { mapComputed } from '@/helpers'
  import global from '@/modules'
  import store from '@/store'
  const { getters, mutations } = global.types
  export default {
    name: 'Menu',
    computed: {
      ...mapComputed(store, 'toolbar', getters.toolbar, mutations.toggleToolbar)
    }
  }

</script>
