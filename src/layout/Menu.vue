<template>
  <v-navigation-drawer app temporary right v-model="toolbar">
    <v-subheader>{{ __("titles.apps") }}</v-subheader>
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="$router.push({ name: item.href })"
        >
          <v-list-item-action>
            <v-icon>{{ __(item.icon, "none") }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ __(item.title) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapComputed } from "@/helpers";
import global from "@/store/modules";
import store from "@/store";
import { session } from "@/store/modules";
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
