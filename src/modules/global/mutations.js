import { mutations } from "./types";

export default {
  [mutations.toggleToolbar](state, toolbar) {
    state.toolbar = toolbar;
  },
  [mutations.changeLang](state, lang) {
    state.lang = lang;
  }
};
