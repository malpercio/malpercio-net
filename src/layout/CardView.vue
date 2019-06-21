<template>
  <v-container grid-list-lg>
    <v-layout align-center fill-height wrap>
      <v-flex v-for="card in this.cards" :key="card.title" md6 xs12>
        <router-link :to="card.href" tag="div">
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 10 : 2}`"
            >
              <v-img
                :height="card.height"
                :width="card.width"
                :src="card.src"
                :position="card.position"
              >
              </v-img>
              <v-container fluid>
                <v-layout fill-height>
                  <v-flex xs12>
                    <span class="headline">{{ __(card.title) }}</span>
                  </v-flex>
                </v-layout>
                <v-layout fill-height>
                  <v-flex xs12>
                    <span>{{ __(card.description) }}</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-hover>
        </router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "CardView",
  props: {
    cards: {
      type: Array,
      required: true,
      items: {
        type: Object,
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
            default: "auto"
          },
          width: {
            type: String,
            deafult: "auto"
          },
          href: {
            type: [String, Object],
            required: true
          },
          position: {
            type: String,
            default: "center"
          }
        }
      }
    }
  }
};
</script>
