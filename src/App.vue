<template>
  <v-app dark>
    <Menu />
    <NavigationBar />
    <v-content>
      <v-container fluid fill-height justify-center>
        <router-view></router-view>
      </v-container>
      <Snackbar />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import { NavigationBar, Menu, Footer, Snackbar } from "@/layout";
export default {
  name: "App",
  components: { NavigationBar, Menu, Footer, Snackbar }
};
</script>
