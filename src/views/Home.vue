<template>
  <CardView :cards="cards" />
</template>

<script>
import { CardView } from "@/layout";
export default {
  name: "Home",
  data() {
    return {
      cards: [
        {
          src: require("@/assets/emmanuel-lemons-1.jpeg"),
          title: "titles.timer",
          description: "descriptions.timer",
          href: "/timer",
          height: "400px",
          position: "bottom"
        },
        {
          src: require("@/assets/emmanuel-rose-1.jpeg"),
          title: "titles.oneNight",
          description: "descriptions.oneNight",
          href: "/one-night",
          height: "400px",
          position: "top"
        }
      ]
    };
  },
  components: { CardView }
};
</script>
