<template>
  <v-data-table
    :items="items"
    :headers="headers"
    hide-actions
    :no-results-text="__('errors.noData')"
    :no-data-text="__('errors.noData')"
    :loading="loading"
  >
    <template v-slot:items="props">
      <tr>
        <td class="text-xs-center">{{ props.item.match }}</td>
        <td class="text-xs-center">{{ props.item.player }}</td>
        <td class="text-xs-center">
          {{ props.item.birds.reduce((partial_sum, a) => partial_sum + a, 0) }}
        </td>
        <td class="text-xs-center">
          {{
            props.item.bonuses.reduce((partial_sum, a) => partial_sum + a, 0)
          }}
        </td>
        <td class="text-xs-center">
          {{ props.item.rounds.reduce((partial_sum, a) => partial_sum + a, 0) }}
        </td>
        <td class="text-xs-center">{{ props.item.eggs }}</td>
        <td class="text-xs-center">{{ props.item.cache }}</td>
        <td class="text-xs-center">{{ props.item.tuckedCards }}</td>
        <td class="text-xs-center">{{ props.item.food }}</td>
        <td class="text-xs-center">{{ props.item.score }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import { mapComputed, fire } from "@/helpers";
import { actions, getters, mutations } from "@/modules/wingspan/types";
import store from "@/store";
const defaultHeaders = [
  {
    text: "Match",
    value: "match"
  },
  {
    text: "Player",
    value: "player"
  },
  {
    text: "Birds",
    value: "birds"
  },
  {
    text: "Bonuses",
    value: "bonuses"
  },
  {
    text: "Rounds",
    value: "rounds"
  },
  {
    text: "Eggs",
    value: "eggs"
  },
  {
    text: "Cache",
    value: "cache"
  },
  {
    text: "tucked cards",
    value: "tuckedCards"
  },
  {
    text: "Food",
    value: "food"
  },
  {
    text: "Total Score",
    value: "score"
  }
];
export default {
  name: "RecordsTable",
  data() {
    return {
      headers: defaultHeaders,
      loading: true
    };
  },
  computed: {
    ...mapComputed(store, "items", getters.wingspanRecords, actions.wingspanRecords),
  },
  methods: {
    async refreshItems() {
      this.loading = true;
      this.$loading(this.$store.dispatch(actions.getWingspanRecords))
        .then(() => (this.loading = false));
    }
  },
  async mounted() {
    this.refreshItems();
  },
  destroyed(){
    this.$store.commit(mutations.clearWingspanRecords)
  }
};
</script>
