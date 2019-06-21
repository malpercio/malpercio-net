import { actions, mutations, getters as globalGetters } from "./types";

export default {
  [actions.deleteSnackbar]({ commit }) {
    commit(mutations.toggleSnackbar, false);
    commit(mutations.snackbarMessage, "");
    commit(mutations.snackbarColor, "default");
  },
  [actions.createSnackbar]({ commit, getters }, options) {
    const message = typeof options === "string" ? options : options.message;
    const color =
      typeof options === "string"
        ? getters[globalGetters.snackbarColor]
        : options.color;
    commit(mutations.snackbarColor, color);
    commit(mutations.snackbarMessage, message);
    commit(mutations.toggleSnackbar, true);
  }
};
