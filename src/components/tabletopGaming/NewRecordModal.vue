<template>
  <v-toolbar flat color="primary">
    <v-toolbar-title>{{ __("titles.records") }}</v-toolbar-title>
    <v-dialog v-model="shown" max-width="600px" persistent>
      <template v-slot:activator="{ on }">
        <v-btn large icon v-on="on" absolute right>
          <v-icon>{{ __("icons.plus", "none") }}</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="headline">{{ __("titles.addRecord") }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout v-for="(field, index) in fields" :key="field.name">
              <template v-if="field.type != 'custom'">
                <v-flex>
                  <v-text-field
                    v-model="item[field.name].value"
                    :type="field.type"
                    :label="capitalize(field.name)"
                  ></v-text-field>
                </v-flex>
              </template>
              <template v-else>
                <v-flex xs2>
                  <v-select
                    v-if="field.type == 'custom'"
                    v-model="item[field.name].type"
                    label="Type"
                    :items="types"
                  ></v-select>
                </v-flex>
                <v-flex xs9>
                  <v-text-field
                    v-model="item[field.name].value"
                    :label="capitalize(field.name)"
                  ></v-text-field>
                </v-flex>
                <v-flex xs1>
                  <v-btn @click="removeField(index)" icon color="error"
                    ><v-icon>fas fa-times</v-icon></v-btn
                  >
                </v-flex>
              </template>
            </v-layout>
            <v-layout>
              <v-flex xs11>
                <v-text-field
                  v-model="newField"
                  label="New field"
                ></v-text-field>
              </v-flex>
              <v-flex xs1>
                <v-btn
                  @click="addField"
                  icon
                  color="primary"
                  :disabled="!newField"
                  ><v-icon>fa- fa-plus</v-icon></v-btn
                >
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="close">Cancel</v-btn>
          <v-btn text>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script>
import capitalize from "lodash.capitalize";

const defaultFields = [
  {
    name: "value",
    type: "text"
  },
  {
    name: "payload",
    type: "text"
  }
];

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
      item: this.getDefaultItem(),
      fields: defaultFields,
      newField: ""
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
    types() {
      return [
        {
          text: this.__("records.text"),
          value: "text"
        },
        {
          text: this.__("records.number"),
          value: "number"
        }
      ];
    }
  },
  methods: {
    close() {
      this.shown = false;
      this.resetModal();
    },
    capitalize,
    getDefaultItem() {
      return defaultFields.reduce((acc, { type, name }) => {
        acc[name] = {
          type,
          value: null
        };
        return acc;
      }, {});
    },
    resetModal() {
      this.item = this.getDefaultItem();
      this.fields = defaultFields;
      this.newField = "";
    },
    addField() {
      const name = this.newField;
      this.newField = "";
      const foundFields = this.fields.filter(i => i.name == name);
      if (!foundFields.length) {
        this.fields.push({
          type: "custom",
          name
        });
        this.item[name] = {
          type: "custom",
          value: null
        };
      }
    },
    removeField(index) {
      const [{ name }] = this.fields.splice(index, 1);
      delete this.item[name];
    }
  }
};
</script>
