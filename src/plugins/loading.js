import Vue from "vue";
import { fire } from "@/helpers";
import global from "@/store/modules";

Vue.use({
  install(VueClass) {
    VueClass.prototype.$loading = async function(promise) {
      this.$store.commit(global.types.mutations.toggleLoading, true);
      await promise.catch(fire);
      this.$store.commit(global.types.mutations.toggleLoading, false);
    };
  }
});
