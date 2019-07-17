import { getters } from "./types";

export default {
  [getters.isLoggedIn]: ({ isLoggedIn }) => isLoggedIn
};
