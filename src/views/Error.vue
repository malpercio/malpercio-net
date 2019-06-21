<template>
  <v-container id="errorContainer">
  <v-layout align-center justify-center fill-height>
    <v-flex xs1 md3>
      <v-img :src="require('@/assets/logo.svg')"/>
    </v-flex>
  </v-layout>
  <v-layout align-center justify-center fill-height>
    <v-flex xs1 md3 id="code">
      < {{code}} />
    </v-flex>
  </v-layout>
  <v-layout align-center justify-center fill-height>
    <v-flex xs1 md3 id="message">
      {{__(message)}}
    </v-flex>
  </v-layout>
  <v-layout align-center justify-center fill-height>
    <v-flex xs1 md3>
      <v-btn @click.prevent="$router.go(-1)">{{__("buttons.back")}}</v-btn>
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
#errorContainer{
  text-align: center;
  #code {
        font-family: 'Monoton', cursive;
        font-size: 50px;
        color: #007700
  };
  #message {
        font-size: 20px;
  }
}

</style>
