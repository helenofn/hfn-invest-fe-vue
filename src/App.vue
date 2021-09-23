 <template>
  <v-app>

    <BarraDrawer v-if="usuarioEstaLogado"></BarraDrawer>

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
import { mapGetters } from 'vuex'

export default{
  components:{
    BarraDrawer
  },
  computed:{
      ...mapGetters(['usuarioEstaLogado'])
  }
}
</script>