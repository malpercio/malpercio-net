import axios from "axios";
import Vue from "Vue";

class HTTPRequestPlugin {
  install(VueClass, options) {
    VueClass.$http = (urlConfig = "default") => {
      const baseURL = options[urlConfig] ? options[urlConfig] : urlConfig;
    };
  }
}

Vue.use(HTTPRequestPlugin, {
  default: "",
  public: ""
});
