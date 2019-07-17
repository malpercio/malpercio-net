import Vue from "vue";
import Vuetify from "vuetify";
import colors from "vuetify/es5/util/colors";

import "vuetify/dist/vuetify.min.css";

const options = {
  theme: {
    dark: true,
    iconfont: "fa",
    themes: {
      dark: {
        primary: colors.indigo,
        secondary: colors.blue.accent4,
        accent: colors.indigo.darken4,
        error: colors.red.darken3,
        info: colors.blue.lighten2,
        success: colors.lightGreen.darken3,
        warning: colors.amber.darken2
      }
    }
  }
};

Vue.use(Vuetify, options);

export default new Vuetify(options);
