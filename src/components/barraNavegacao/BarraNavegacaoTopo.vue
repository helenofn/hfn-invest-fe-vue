<template>
    <v-app-bar app fixed >
      <v-app-bar-nav-icon @click.stop="openMenuToogle"></v-app-bar-nav-icon>
      <v-toolbar-title>LULEKE Invest</v-toolbar-title>
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
        }
    },
  }
</script>

