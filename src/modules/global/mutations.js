import { mutations } from "./types";

export default {
  [mutations.toggleToolbar](state, toolbar) {
    state.toolbar = toolbar;
  },
  [mutations.toggleLoading](state, loading) {
    state.loading = loading;
  },
  [mutations.changeLang](state, lang) {
    state.lang = lang;
  }
};
