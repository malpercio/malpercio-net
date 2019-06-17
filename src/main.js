import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import amplify from "./amplify";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  router,
  store,
  amplify,
  render: h => h(App)
}).$mount("#app");
