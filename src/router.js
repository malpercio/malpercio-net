import Vue from "vue";
import Router from "vue-router";
import { SignIn } from "@/views";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: SignIn
    }
  ]
});
