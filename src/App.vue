 <template>
  <v-app>

    <Loading></Loading>
    <BarraDrawer v-if="usuarioEstaLogado"></BarraDrawer>
    <BarraNavegacaoTopo v-if="usuarioEstaLogado"></BarraNavegacaoTopo>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import BarraDrawer from '@/components/barraNavegacao/BarraDrawer';
import BarraNavegacaoTopo from '@/components/barraNavegacao/BarraNavegacaoTopo';
import Loading from '@/components/loading/Loading.vue';
//import { mapGetters } from 'vuex'

export default{
  components:{
    BarraDrawer,
    BarraNavegacaoTopo,
    Loading
  },
  computed:{
    usuarioEstaLogado(){
      return this.$store.getters.usuarioEstaLogado;
    }
      //...mapGetters(['usuarioEstaLogado'])
  },
  data () {
      return {
        
      }
  }
}
</script>