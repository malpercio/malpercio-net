<template>
  <v-data-table :items="items" :headers="headers"></v-data-table>
</template>

<script>
import capitalize from "lodash.capitalize";

const defaultHeaders = [
  {
    text: "Date",
    value: "datetime"
  },
  {
    text: "Value",
    value: "value"
  },
  {
    text: "Payload",
    value: "payload"
  }
];
export default {
  name: "RecordsTable",
  data() {
    return {
      items: [
        {
          extra: "Yup"
        }
      ]
    };
  },
  computed: {
    headers() {
      const reducer = (accumulator, item) => {
        const headers = accumulator.reduce((acc, h) => {
          acc.push(h.value);
          return acc;
        }, []);

        const newHeaders = Object.keys(item)
          .filter(h => !headers.includes(h))
          .map(h => ({ value: h, text: capitalize(h) }));
        return accumulator.concat(newHeaders);
      };
      return this.items.reduce(reducer, defaultHeaders);
    }
  }
};
</script>
