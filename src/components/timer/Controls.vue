<template>
  <v-flex text-xs-right>
    <v-btn
      text
      :size="$vuetify.breakpoint.smAndUp ? '36px' : '16px'"
      color="secondary"
      :disabled="value.playDisabled"
      @click.prevent="$emit(value.isPaused ? 'play' : 'pause')"
    >
      <v-icon :size="$vuetify.breakpoint.smAndUp ? '36px' : '16px'"
        >{{
          value.isPaused ? __("icons.play", "none") : __("icons.pause", "none")
        }}
      </v-icon>
    </v-btn>
    <v-btn
      text
      :size="$vuetify.breakpoint.smAndUp ? '36px' : '16px'"
      color="error"
      :disabled="value.stopDisabled"
      @click.prevent="$emit('stop')"
    >
      <v-icon :size="$vuetify.breakpoint.smAndUp ? '36px' : '16px'">{{
        __("icons.stop", "none")
      }}</v-icon>
    </v-btn>
  </v-flex>
</template>

<script>
export default {
  name: "Controls",
  model: {
    prop: "value",
    event: "updateControls"
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>
