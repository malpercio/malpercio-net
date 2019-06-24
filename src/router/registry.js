import { isLoggedIn, isNotLoggedIn, checkPolicies } from "./policies";
import { SignIn, AdminHome, Error, Home, Timer } from "@/views";

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
    component: Home
  },
  {
    path: "/timer",
    name: "timer",
    component: Timer
  },
  {
    path: "/one-night",
    name: "oneNight",
    component: Error,
    props: { code: 404, message: "errors.PageInMaintenance" }
  },
  {
    path: "*",
    name: "fallback",
    component: Error,
    props: { code: 404, message: "errors.PageNotFound" }
  }
];
