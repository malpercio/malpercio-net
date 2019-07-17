import { getters } from "./types";

export default {
  [getters.toolbar]: ({ toolbar }) => toolbar,
  [getters.loading]: ({ loading }) => loading,
  [getters.snackbar]: ({ snackbar }) => snackbar,
  [getters.snackbarMessage]: ({ snackbarMessage }) => snackbarMessage,
  [getters.snackbarColor]: ({ snackbarColor }) => snackbarColor,
  [getters.lang]: ({ lang }) => lang
};
