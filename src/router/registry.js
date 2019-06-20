import {
  isLoggedIn,
  isNotLoggedIn,
  checkPolicies,
  forcedRedirection
} from "./policies";
import { SignIn, AdminHome } from "@/views";

export default [
  {
    path: "/login",
    name: "login",
    component: SignIn,
    beforeEnter: checkPolicies([isNotLoggedIn])
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminHome,
    beforeEnter: checkPolicies([isLoggedIn])
  },
  {
    path: "/",
    name: "home",
    beforeEnter: checkPolicies([forcedRedirection("/admin")])
  }
];
