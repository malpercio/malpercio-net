<template>
  <CardView :cards="cards" />
</template>

<script>
import { CardView } from "@/layout";
export default {
  name: "TabletopGaming",
  data() {
    return {
      cards: [
        {
          src: require("@/assets/carlos-muza-84523-unsplash.jpg"),
          title: "titles.records",
          description: "descriptions.records",
          href: { name: "records" },
          height: "400px",
          position: "top"
        },
        {
          src: require("@/assets/carlos-muza-84523-unsplash.jpg"),
          title: "titles.wingspan",
          description: "descriptions.wingspan",
          href: { name: "wingspan" },
          height: "400px",
          position: "top"
        }
      ]
    };
  },
  components: { CardView }
};
</script>
