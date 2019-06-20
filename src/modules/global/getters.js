import { getters } from "./types";

export default {
  [getters.toolbar]: ({ toolbar }) => toolbar,
  [getters.loading]: ({ loading }) => loading,
  [getters.lang]: ({ lang }) => lang
};
