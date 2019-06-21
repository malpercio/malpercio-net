<template>
  <router-link :to="href">
    <v-hover>
      <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 2}`">
        <v-img :height="height" :width="width" :src="src"> </v-img>
        <v-container fluid>
          <v-layout fill-height>
            <v-flex xs12>
              <span class="headline">{{ title }}</span>
            </v-flex>
          </v-layout>
          <v-layout fill-height>
            <v-flex xs12>
              <span>{{ description }}</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-hover>
  </router-link>
</template>

<script>
export default {
  name: "CardRouter",
  props: {
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: "400px"
    },
    width: {
      type: String,
      deafult: "auto"
    },
    href: {
      type: [String, Object],
      required: true
    }
  }
};
</script>
