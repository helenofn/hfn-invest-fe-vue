<template>
    <v-navigation-drawer app permanent>
        <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="text-h6">
                LULEKE Invest
            </v-list-item-title>
            <v-list-item-subtitle>
                Nome do usuário
            </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
            dense
            nav
        >
            <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                @click="direcionarPagina(item.routeName)"
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Dashboards', icon: 'mdi-view-dashboard', routeName: 'dashboard' },
          { title: 'Movimentações', icon: 'mdi-bank-transfer', routeName: 'movimentacoes' },
          { title: 'Corretora', icon: 'mdi-office-building', routeName: '' },
          { title: 'Transações', icon: 'mdi-cash-multiple', routeName: '' },
        ],
        right: null,
      }
    },
    methods:{
        direcionarPagina(routeName){
            this.$router.push({ name: routeName });
        }
    }
  }
</script>