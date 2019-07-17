import store from "@/store";
import global from "@/store/modules";
export default function(err) {
  const message =
    "errors." +
    (typeof err === "string"
      ? err
      : err.code || err.type || err.message || "Unknown");
  const color = "error";
  store.dispatch(global.types.actions.createSnackbar, { message, color });
}
