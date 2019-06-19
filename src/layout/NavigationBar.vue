<template>

  <v-toolbar color="primary" app>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon @click.prevent="toolbar = true">
      <v-icon>
        fas fa-sliders-h
      </v-icon>
    </v-toolbar-side-icon>
  </v-toolbar>

</template>

<script>

  import { mapComputed } from '@/helpers'
  import global from '@/modules'
  import store from '@/store'
  const { getters, mutations } = global.types
  export default {
    name: 'NavigationBar',
    computed: {
      ...mapComputed(store, 'toolbar', getters.toolbar, mutations.toggleToolbar)
    }
  }

</script>
