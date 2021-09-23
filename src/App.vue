<template>
  <v-app>
    <BarraNavegacaoTopo></BarraNavegacaoTopo>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import BarraNavegacaoTopo from '@/components/BarraNavegacaoTopo/BarraNavegacaoTopo'

export default{
  components:{
    BarraNavegacaoTopo
  }
}
</script>