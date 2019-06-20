<template>
  <v-navigation-drawer app temporary right v-model="toolbar">
  </v-navigation-drawer>
</template>

<script>
import { mapComputed } from "@/helpers";
import global from "@/modules";
import store from "@/store";
import { session } from "@/modules";
export default {
  name: "Menu",
  computed: {
    ...mapComputed(
      store,
      "toolbar",
      global.types.getters.toolbar,
      global.types.mutations.toggleToolbar
    ),
    ...mapComputed(
      store,
      "isLoggedIn",
      session.types.getters.toolbar,
      session.types.mutations.toggleToolbar
    )
  }
};
</script>
