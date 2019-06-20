import Vue from "vue";
import Router from "vue-router";
import routes from "./registry";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: routes
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || document.title;

  return next();
});

export default router;
