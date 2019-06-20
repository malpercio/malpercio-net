import Amplify, * as AmplifyModules from "aws-amplify";
import Vue from "vue";

class AmplifyPlugin {
  static install(Vue, options) {
    Vue.prototype.Amplify = AmplifyModules;
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
