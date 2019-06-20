import { getters } from "./types";

export default {
  [getters.toolbar]: ({ toolbar }) => toolbar,
  [getters.lang]: ({ lang }) => lang
};
