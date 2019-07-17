<template>
  <v-app-bar app flat class="primary">
    <v-toolbar-title>
      <router-link to="/">
        <img :src="logo" class="logo" />
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-progress-circular indeterminate v-show="loading"></v-progress-circular>
    <v-spacer />
    <v-toolbar-items>
      <v-btn text @click.prevent="logout" v-if="isLoggedIn"
        >{{ __("buttons.logout") }}
      </v-btn>
      <v-btn
        text
        @click.prevent="$router.push({ name: 'login' })"
        v-else-if="$route.name !== 'login'"
        >{{ __("buttons.login") }}
      </v-btn>
      <v-btn text @click.prevent="toggleLang">{{ lang }}</v-btn>
    </v-toolbar-items>
    <v-app-bar-nav-icon @click.prevent="toolbar = true" v-if="isLoggedIn">
      <v-icon icon>
        {{ __("icons.settings", "none") }}
      </v-icon>
    </v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script>
import { mapComputed, fire } from "@/helpers";
import global from "@/store/modules";
import store from "@/store";
import { session } from "@/store/modules";
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
        .then(() => this.$router.push({ name: "home" }))
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
