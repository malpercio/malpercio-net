import { session } from "@/store/modules";
import store from "@/store";

export async function isLoggedIn() {
  return {
    passed: store.getters[session.types.getters.isLoggedIn],
    params: { path: "/login" }
  };
}

export async function isNotLoggedIn() {
  return {
    passed: !store.getters[session.types.getters.isLoggedIn],
    params: { path: "/" }
  };
}

export function forcedRedirection(path) {
  return async () => ({
    passed: false,
    params: { path: path }
  });
}

export function checkPolicies(arrayOfPolicies) {
  return async (to, from, next) => {
    for (const policy of arrayOfPolicies) {
      const { passed, params } = await policy(to, from);

      if (!passed) {
        return next(params);
      }
    }
    next();
  };
}
