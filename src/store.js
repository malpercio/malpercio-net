import Vue from "vue";
import Vuex from "vuex";
import global from "./modules";
import { session } from "./modules";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence();

Vue.use(Vuex);

export default new Vuex.Store({
  ...global,
  modules: {
    session
  },
  plugins: [vuexLocal.plugin]
});
