import { isLoggedIn, isNotLoggedIn, checkPolicies } from "./policies";
import {
  SignIn,
  AdminHome,
  Error,
  Home,
  PublicTimer,
  TabletopGaming,
  Wingspan,
  Records
} from "@/views";

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
    component: PublicTimer
  },
  {
    path: "/tabletop-gaming/records",
    name: "records",
    component: Records,
    beforeEnter: checkPolicies([isLoggedIn])
  },
  {
    path: "/tabletop-gaming/wingspan",
    name: "wingspan",
    component: Wingspan,
    beforeEnter: checkPolicies([isLoggedIn])
  },
  {
    path: "/tabletop-gaming",
    name: "tabletopGaming",
    component: TabletopGaming,
    beforeEnter: checkPolicies([isLoggedIn])
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
