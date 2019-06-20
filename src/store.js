import Vue from "vue";
import Vuex from "vuex";
import global from "@/modules";
import { session } from "@/modules";

Vue.use(Vuex);

export default new Vuex.Store({
  ...global,
  modules: {
    session
  }
});
