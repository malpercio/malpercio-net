<template>
  <v-footer app height="auto" color="primary">
    <v-spacer />
    <v-btn
      v-for="icon in icons"
      large
      icon
      :key="icon.name"
      :href="icon.href"
      target="_blank"
    >
      <v-icon medium>{{ icon.name }}</v-icon>
    </v-btn>
    <v-spacer />
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      icons: [
        {
          name: this.__("icons.github", "none"),
          href: "https://github.com/malpercio"
        },
        {
          name: this.__("icons.linkedin", "none"),
          href: "https://www.linkedin.com/in/daniel-gonzález-espinoza-52066013a"
        }
      ]
    };
  }
};
</script>
