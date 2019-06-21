<template>
  <v-app dark>
    <Menu />
    <NavigationBar />
    <v-content>
      <v-container fluid fill-height justify-center>
        <router-view></router-view>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import { NavigationBar, Menu, Footer } from "@/layout";

export default {
  name: "App",
  components: { NavigationBar, Menu, Footer }
};
</script>
