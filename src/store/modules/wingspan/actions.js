import { actions, mutations } from "./types";
import { actions as sessionActions } from "../session/types";
import axios from "axios";

export default {
  async [actions.getWingspanRecords]({ commit, dispatch }) {
    const jwtToken = await dispatch(sessionActions.getToken);
    const { data } = await axios.get(
      "https://7wv2cgr661.execute-api.us-east-2.amazonaws.com/Prod/wingspan",
      {
        headers: {
          Authorization: jwtToken
        }
      }
    );
    commit(mutations.wingspanRecords, data);
  },
  async [actions.createWingspanRecord]({ commit, dispatch }, item) {
    const jwtToken = await dispatch(sessionActions.getToken);
    const { data } = await axios.post(
      "https://7wv2cgr661.execute-api.us-east-2.amazonaws.com/Prod/wingspan",
      item,
      {
        headers: {
          Authorization: jwtToken
        }
      }
    );
    commit(mutations.addWingspanRecords, [data]);
  }
};
