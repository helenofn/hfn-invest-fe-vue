<template>
    <v-navigation-drawer app permanent>
        <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="text-h6">
                LULEKE Invest
            </v-list-item-title>
            <v-list-item-subtitle>
                {{usuario.name}}
            </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
            dense
            nav
        >
            <v-list-group
                :value="false"
                prepend-icon="mdi-security"
            >

                <template v-slot:activator>
                <v-list-item-title>Adm</v-list-item-title>
                </template>

                <v-list-group
                        :value="false"
                        no-action
                        sub-group
                        >
                    <template v-slot:activator>
                        <v-list-item-content>
                        <v-list-item-title>Cadastro</v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item
                        v-for="([title, icon, rote], i) in itensCadastro"
                        :key="i"
                        link
                        @click="direcionarPagina(rote)"
                    >
                        <v-list-item-title v-text="title"></v-list-item-title>

                        <v-list-item-icon>
                            <v-icon v-text="icon"></v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list-group>
            </v-list-group>
        </v-list>

        <v-divider></v-divider>

        <v-list
            dense
            nav
        >
            <v-list-item
                v-for="([title, icon, rote], i) in itensComum"
                :key="i"
                link
                @click="direcionarPagina(rote)"
            >
                <v-list-item-icon>
                    <v-icon>{{ icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ title }}</v-list-item-title>
                </v-list-item-content>

            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { store } from '@/store'

  export default {
    data () {
      return {
        itensCadastro: [
            ['Usuário', 'mdi-account', 'cadastroUsuario'],
            ['Categoria de ativo', 'mdi-cog', ''],
            ['Empresa', 'mdi-office-building', ''],
            ['Ativo financeiro', 'mdi-finance', '']
        ],
        itensComum: [
          ['Dashboards', 'mdi-view-dashboard', 'dashboard'],
          ['Movimentações', 'mdi-bank-transfer', 'movimentacoes'],
          ['Corretora', 'mdi-office-building', '' ],
          ['Transações', 'mdi-cash-multiple', '' ]
        ],
        right: null,
        usuario: store.state.auth.usuario
      }
    },
    methods:{
        direcionarPagina(routeName){
            this.$router.push({ name: routeName });
        }
    },
    created: function () {
        
    } 
  }
</script>