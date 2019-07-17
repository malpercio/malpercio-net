<template>
  <v-app>
    <Menu> </Menu>
    <NavigationBar />
    <v-content>
      <router-view></router-view>
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
