import Amplify, * as AmplifyModules from "aws-amplify";
import Vue from "vue";

class AmplifyPlugin {
  static install(Vue, options) {
    Vue.Amplify = AmplifyModules;
    Amplify.configure(options);
  }
}

const options = {
  Auth: {
    region: process.env.AWS_REGION,
    userPoolId: process.env.AWS_USER_POOL_ID,
    userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID
  }
};

Vue.use(AmplifyPlugin, options);

export default new AmplifyPlugin();
