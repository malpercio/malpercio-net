<template>
  <v-toolbar color="primary" app>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon @click.prevent="toolbar = true" v-if="isLoggedIn">
      <v-icon>
        {{__("icons.settings", "none")}}
      </v-icon>
    </v-toolbar-side-icon>
  </v-toolbar>
</template>

<script>
import { mapComputed } from "@/helpers";
import global from "@/modules";
import store from "@/store";
import { session } from "@/modules";
const { getters, mutations } = global.types;
export default {
  name: "NavigationBar",
  computed: {
    ...mapComputed(store, "toolbar", getters.toolbar, mutations.toggleToolbar),
    ...mapComputed(
      store,
      "isLoggedIn",
      session.types.getters.toolbar,
      session.types.mutations.toggleToolbar
    )
  }
};
</script>
