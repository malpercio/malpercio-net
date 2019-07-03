<template>
  <v-toolbar flat color="primary">
    <v-toolbar-title>{{ __("titles.records") }}</v-toolbar-title>
    <v-dialog v-model="shown" max-width="600px" persistent>
      <template v-slot:activator="{ on }">
        <v-btn large icon color="secondary" v-on="on" absolute right>
          <v-icon>{{ __("icons.plus", "none") }}</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="headline">{{ __("titles.addRecord") }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout>
              <v-flex xs6>
                <v-text-field v-model="match" label="Match"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="player"
                  label="Player"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs3>
                <v-text-field
                  v-model="bonus"
                  label="Bonus"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-btn
                  flat
                  @click="
                    bonuses.push(parseInt(bonus));
                    bonus = '';
                  "
                  >Add bonus</v-btn
                >
              </v-flex>
              <v-flex xs3>
                <v-text-field
                  v-model="bird"
                  label="Bird"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-btn
                  flat
                  @click="
                    birds.push(parseInt(bird));
                    bird = '';
                  "
                  >Add bird</v-btn
                >
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs3 v-for="round in [1, 2, 3, 4]">
                <v-text-field
                  v-model="rounds[round - 1]"
                  :label="`Round ${round}`"
                  type="number"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs3>
                <v-text-field
                  v-model="eggs"
                  label="Eggs"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-text-field
                  v-model="cache"
                  label="Cache"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-text-field
                  v-model="tuckedCards"
                  label="Tucked cards"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-text-field
                  v-model="food"
                  label="Food"
                  type="number"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="close">Cancel</v-btn>
          <v-btn flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script>
import capitalize from "lodash.capitalize";
import { mutations, actions } from "@/modules/wingspan/types";
import axios from "axios";

export default {
  model: {
    prop: "value",
    event: "toggleNewRecordModalVisibility"
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  name: "NewRecordModal",
  data() {
    return {
      bonus: '',
      bird: '',
      birds: [],
      eggs:'',
      rounds:['','','',''],
      bonuses:[],
      food:'',
      cache:'',
      tuckedCards:'',
      player:'',
      match:''
        };
  },
  computed: {
    shown: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("toggleNewRecordModalVisibility", value);
      }
    },
    item(){
        return {
          birds: this.birds,
          bonuses: this.bonuses,
          rounds: this.rounds.map(x => parseInt(x)),
          eggs: parseInt(this.eggs),
          food: parseInt(this.food),
          cache: parseInt(this.cache),
          tuckedCards: parseInt(this.tuckedCards),
          player: this.player,
          datetime: Date.now(),
          match: this.match
        };
      },
  },
  methods: {
    close() {
      this.shown = false;
      this.resetModal();
    },
    capitalize,
    resetData() {
      this.bonus= ''
      this.bird= ''
      this.eggs=''
      this.rounds=['','','','']
      this.food=''
      this.cache=''
      this.tuckedcards=''
      this.player=''
      this.match=''
    },
    resetModal() {
      this.resetData();
      this.bonus = ''
      this.bird = '';
    },
    async save() {
      const creation = this.$store.dispatch(actions.createWingspanRecord, this.item)

      return this.$loading(creation).then(() => this.close());
    }
  }
};
</script>
