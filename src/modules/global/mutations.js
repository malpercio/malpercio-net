import { mutations } from "./types";

export default {
  [mutations.toggleToolbar](state, toolbar) {
    state.toolbar = toolbar;
  },
  [mutations.toggleLoading](state, loading) {
    state.loading = loading;
  },
  [mutations.toggleSnackbar](state, snackbar) {
    state.snackbar = snackbar;
  },
  [mutations.snackbarMessage](state, snackbarMessage) {
    state.snackbarMessage = snackbarMessage;
  },
  [mutations.snackbarColor](state, snackbarColor) {
    state.snackbarColor = snackbarColor;
  },
  [mutations.changeLang](state, lang) {
    state.lang = lang;
  }
};
