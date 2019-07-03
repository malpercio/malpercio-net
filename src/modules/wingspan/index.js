import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
import {
  actions as actionTypes,
  getters as getterTypes,
  mutations as mutationTypes
} from "./types";
import state from "./state";
export default {
  mutations,
  getters,
  types: {
    actions: actionTypes,
    getters: getterTypes,
    mutations: mutationTypes
  },
  actions,
  state
};
