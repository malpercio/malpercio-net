<template>
  <v-layout align-center justify-center fill-height>
    <v-flex xs1 md3>
      <v-form v-model="valid">
        <v-text-field
          v-model="username"
          :append-icon="__('icons.user', 'none')"
          :rules="usernameRules"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :append-icon="showPassword ? __('icons.eye', 'none') : __('icons.closedEye', 'none')"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          label="Password"
          required
        ></v-text-field>
        <v-btn :disabled="!valid" @click.prevent="signIn()">
          {{__("buttons.logIn")}}
        </v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import {session} from "@/modules";
export default {
  name: "SignIn",
  data() {
    return {
      username: "",
      password: "",
      usernameRules: [v => !!v || this.__("errors.UsernameRequired")],
      passwordRules: [v => !!v || this.__("errors.PasswordRequired")],
      valid: false,
      showPassword: false
    };
  },
  methods: {
    async signIn() {
      const { Auth } = this.Amplify;
      await Auth.signIn(this.username, this.password)
        .then(u=>this.$store.commit(session.types.mutations.isLoggedIn, true))
        .catch(console.log);
    }
  }
};
</script>
