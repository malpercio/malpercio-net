import Vue from "vue";
import Router from "vue-router";
import { SignIn, AdminHome } from "@/views";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: SignIn
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminHome
    }
  ]
});
