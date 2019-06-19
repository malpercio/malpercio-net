import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import amplify from "./amplify";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import colors from "vuetify/es5/util/colors";

Vue.config.productionTip = false;
Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.darken3,
    secondary: colors.blue.accent4,
    accent: colors.indigo.darken4,
    error: colors.red.darken4,
    info: colors.blue.lighten2,
    success: colors.lightGreen.darken3,
    warning: colors.amber.darken2
  }
});

new Vue({
  router,
  store,
  amplify,
  render: h => h(App)
}).$mount("#app");
