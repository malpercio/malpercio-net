<template>
  <v-toolbar color="primary" app>
    <v-toolbar-title>
      <router-link to="/">
        <img :src="logo" class="logo" />
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-progress-circular indeterminate v-show="loading"></v-progress-circular>
    <v-spacer />
    <v-toolbar-items>
      <v-btn flat @click.prevent="logout" v-if="isLoggedIn"
        >{{ __("buttons.logout") }}
      </v-btn>
      <v-btn flat @click.prevent="toggleLang">{{ lang }}</v-btn>
    </v-toolbar-items>
    <v-toolbar-side-icon
      large
      @click.prevent="toolbar = true"
      v-if="isLoggedIn"
    >
      <v-icon>
        {{ __("icons.settings", "none") }}
      </v-icon>
    </v-toolbar-side-icon>
  </v-toolbar>
</template>

<script>
import { mapComputed, fire } from "@/helpers";
import global from "@/modules";
import store from "@/store";
import { session } from "@/modules";
import logo from "@/assets/logo.svg";

const { getters, mutations } = global.types;

export default {
  name: "NavigationBar",
  data() {
    return { logo };
  },
  computed: {
    ...mapComputed(store, "toolbar", getters.toolbar, mutations.toggleToolbar),
    ...mapComputed(store, "lang", getters.lang, mutations.changeLang),
    ...mapComputed(store, "loading", getters.loading, mutations.toggleLoading),
    ...mapComputed(
      store,
      "isLoggedIn",
      session.types.getters.isLoggedIn,
      session.types.mutations.isLoggedIn
    )
  },
  methods: {
    async logout() {
      const { Auth } = this.Amplify;
      return Auth.signOut()
        .then(() =>
          this.$store.commit(session.types.mutations.isLoggedIn, false)
        )
        .then(() => this.$router.push({ name: "login" }))
        .catch(fire);
    },
    toggleLang() {
      const languages = Object.keys(this.$locales).filter(a => a != "none");
      const currentIndex = languages.indexOf(this.lang);
      const nextIndex =
        currentIndex + 1 < languages.length ? currentIndex + 1 : 0;
      this.lang = languages[nextIndex];
    }
  }
};
</script>

<style>
.logo {
  height: 50px;
  margin-top: 5px;
}
</style>
