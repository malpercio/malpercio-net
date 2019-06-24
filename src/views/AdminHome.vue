<template>
  <CardView :cards="cards" />
</template>

<script>
import { CardView } from "@/layout";
export default {
  name: "AdminHome",
  data() {
    return {
      cards: [
        {
          src: require("@/assets/carlos-muza-84523-unsplash.jpg"),
          title: "titles.counter",
          description: "descriptions.counter",
          href: "/counter",
          height: "400px",
          position: "top"
        },
        {
          src: require("@/assets/med-badr-chemmaoui-630239-unsplash.jpg"),
          title: "titles.account",
          description: "descriptions.account",
          href: "/account",
          height: "400px"
        }
      ]
    };
  },
  components: { CardView }
};
</script>
