import { mutations } from "./types";

export default {
  [mutations.toggleToolbar](state, toolbar) {
    state.toolbar = toolbar;
  }
};
