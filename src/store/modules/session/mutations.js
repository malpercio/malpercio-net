import { mutations } from "./types";

export default {
  [mutations.isLoggedIn](state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  }
};
