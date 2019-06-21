<template>
  <v-layout align-center justify-center fill-height>
    <v-flex xs12 md3>
      <v-form v-model="valid">
        <v-text-field
          v-model="username"
          :append-icon="__('icons.user', 'none')"
          :rules="usernameRules"
          :label="__('labels.username')"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :append-icon="
            showPassword
              ? __('icons.eye', 'none')
              : __('icons.closedEye', 'none')
          "
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          :label="__('labels.password')"
          required
        ></v-text-field>
        <v-btn :disabled="!valid" type="submit" @click.prevent="signIn">
          {{ __("buttons.logIn") }}
        </v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { session } from "@/modules";
import { fire } from "@/helpers";
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
      const cognitoCall = Auth.signIn(this.username, this.password)
        .then(user => {
          if (user.challengeName == "NEW_PASSWORD_REQUIRED") {
            return Auth.completeNewPassword(user, this.password);
          }
        })
        .then(() =>
          this.$store.commit(session.types.mutations.isLoggedIn, true)
        )
        .then(() => this.$router.push({ name: "admin" }))
        .catch(fire);
      return this.$loading(cognitoCall);
    }
  }
};
</script>
