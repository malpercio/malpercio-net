import { mutations } from "./types";

export default {
  [mutations.addWingspanRecords](state, wingspanRecords) {
    wingspanRecords.forEach(w => state.wingspanRecords.push(w));
  },
  [mutations.clearWingspanRecords](state) {
    state.wingspanRecords.splice(0, state.wingspanRecords.length);
  },
  [mutations.wingspanRecords](state, wingspanRecords) {
    state.wingspanRecords.splice(0, state.wingspanRecords.length);
    wingspanRecords.forEach(w => state.wingspanRecords.push(w));
  }
};
