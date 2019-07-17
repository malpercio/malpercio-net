<template>
  <v-data-table
    :items="items"
    :headers="headers"
    hide-default-footer
    :no-results-text="__('errors.noData')"
    :no-data-text="__('errors.noData')"
    :loading="loading"
  >
  <template v-slot:item.birds="{ item }">
    {{item.birds.length? item.birds: '-'}}
  </template>
  <template v-slot:item.bonuses="{ item }">
    {{item.bonuses.length? item.bonuses: '-'}}
  </template>
  <template v-slot:item.rounds="{ item }">
    {{item.rounds}}
  </template>
  </v-data-table>
</template>

<script>
import { mapComputed } from "@/helpers";
import { actions, getters, mutations } from "@/store/modules/wingspan/types";
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
    ...mapComputed(
      store,
      "items",
      getters.wingspanRecords,
      actions.wingspanRecords
    )
  },
  methods: {
    async refreshItems() {
      this.loading = true;
      this.$loading(this.$store.dispatch(actions.getWingspanRecords)).then(
        () => (this.loading = false)
      );
    }
  },
  async mounted() {
    this.refreshItems();
  },
  destroyed() {
    this.$store.commit(mutations.clearWingspanRecords);
  }
};
</script>
