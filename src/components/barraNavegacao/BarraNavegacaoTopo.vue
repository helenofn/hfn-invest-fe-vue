<template>
    <v-app-bar app fixed elevation="3">
      <v-app-bar-nav-icon @click.stop="openMenuToogle"></v-app-bar-nav-icon>
      <v-toolbar-title>LULEKE Invest</v-toolbar-title>
      <v-spacer></v-spacer>
        
      <v-btn icon @click="logout">   
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    
    </v-app-bar>
</template>

<script>

  export default {
    data () {
      return {
        
      }
    },
    created: function () {
        
    },
    methods:{
        openMenuToogle(){
          this.$store.dispatch('menuToogle');
        },
        logout(){
          this.$store.dispatch('efetuarLogout');
        }
    },
  }
</script>

