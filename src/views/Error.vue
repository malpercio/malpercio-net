<template>
  <v-container id="errorContainer" text-xs-center>
    <v-layout align-center justify-center fill-height>
      <v-flex xs12 md4>
        <v-img :src="require('@/assets/logo.svg')" />
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center fill-height>
      <v-flex xs12 md4 id="code" class="display-2 error--text">&lt; {{ code }} /&gt;</v-flex>
    </v-layout>
    <v-layout align-center justify-center fill-height>
      <v-flex xs12 md4>
        {{ __(message) }}
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center fill-height>
      <v-flex xs12 md4>
        <v-btn @click.prevent="$router.go(-1)">{{ __("buttons.back") }}</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    code: {
      type: Number,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  name: "Error"
};
</script>

<style lang="scss">
</style>
