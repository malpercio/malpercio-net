import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import Vue from "vue";

class AmplifyPlugin {
  static install(Vue, options) {
    Vue.prototype.Amplify = { Auth };
    Vue.Amplify = { Auth };
    Amplify.configure(options);
  }
}

const options = {
  Auth: {
    region: process.env.VUE_APP_AWS_REGION,
    userPoolId: process.env.VUE_APP_AWS_USER_POOL_ID,
    userPoolWebClientId: process.env.VUE_APP_USER_POOL_WEB_CLIENT_ID
  }
};

Vue.use(AmplifyPlugin, options);

export default new AmplifyPlugin();
