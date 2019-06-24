<template>
  <v-navigation-drawer app temporary right v-model="toolbar">
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            {{ __("titles.apps") }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click="$router.push({ name: item.href })"
      >
        <v-list-tile-action>
          <v-icon>{{ __(item.icon, "none") }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ __(item.title) }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapComputed } from "@/helpers";
import global from "@/modules";
import store from "@/store";
import { session } from "@/modules";
export default {
  name: "Menu",
  data() {
    return {
      items: [
        {
          title: "titles.home",
          href: "home",
          icon: "icons.home"
        },
        {
          title: "titles.adminHome",
          href: "admin",
          icon: "icons.admin"
        }
      ]
    };
  },
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
