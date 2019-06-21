<template>
  <v-snackbar top :color="snackbarColor" v-model="snackbar">
    {{ __(snackbarMessage) }}
    <v-btn dark flat @click="deleteSnackbar">
      {{ __("buttons.closeSnackbar") }}
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapComputed } from "@/helpers";
import store from "@/store";
import { mapActions } from "vuex";
import global from "@/modules";
export default {
  name: "Snackbar",
  computed: {
    ...mapComputed(
      store,
      "snackbar",
      global.types.getters.snackbar,
      global.types.mutations.toggleSnackbar
    ),
    ...mapComputed(
      store,
      "snackbarMessage",
      global.types.getters.snackbarMessage,
      global.types.mutations.snackbarMessage
    ),
    ...mapComputed(
      store,
      "snackbarColor",
      global.types.getters.snackbarColor,
      global.types.mutations.snackbarColor
    )
  },
  methods: {
    ...mapActions(global.types.actions)
  }
};
</script>
