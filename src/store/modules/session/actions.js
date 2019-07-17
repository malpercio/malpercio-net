import { actions, getters as sessionGetters } from "./types";
import Vue from "vue";
export default {
  async [actions.getToken]({ getters }) {
    if (!getters[sessionGetters.isLoggedIn]) {
      return Promise.reject(new Error("errors.notLoggedIn"));
    }
    const user = await Vue.Amplify.Auth.currentAuthenticatedUser();
    const { jwtToken } = user.signInUserSession.idToken;

    return jwtToken;
  }
};
