<template>

  <v-footer app height="auto" color="primary">
    <v-spacer/>
    <v-btn v-for="icon in icons" large icon
           :key="icon.name"
           :href="icon.href"
           target="_blank">
      <v-icon medium>{{icon.name}}</v-icon>
    </v-btn>
    <v-spacer/>

  </v-footer>

</template>

<script>

  export default {
    name: 'Footer',
    data() {
      return {
        icons: [
          {
            name: 'fab fa-github',
            href: 'https://github.com/malpercio'
          },
          {
            name: 'fab fa-linkedin',
            href: 'https://www.linkedin.com/in/daniel-gonzález-espinoza-52066013a'
          }
        ]
      }
    }
  }

</script>
