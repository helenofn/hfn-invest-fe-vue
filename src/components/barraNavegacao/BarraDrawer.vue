<template>
    <v-navigation-drawer app temporary stateless :value="getMenuIsOpen">
        <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="text-h6">
                LULEKE Invest
                <v-icon class="float-right" 
                    @click.stop="closeMenu">
                    mdi-window-close
                </v-icon>
            </v-list-item-title>
            <v-list-item-subtitle>
                {{usuario.name}}
            </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider v-if="isAdm"></v-divider>

        <v-list v-if="isAdm"
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
import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        itensCadastro: [],
        itensComum: [],
        right: null,
        //usuario: store.state.auth.usuario
      }
    },
    computed:{
        ...mapGetters(['getMenuIsOpen']),
        usuario(){
            return store.state.auth.usuario
            //return this.$store.getters.usuario
        },
        isAdm(){
            return store.state.auth.isAdm
        }
    },
    created(){
        this.construirMenuPorRole();
    },
    methods:{
        construirMenuPorRole(){
            this.usuario.roles.map(role=>{
                if(role.name=='ADM'){
                    this.construirMenuAdm();
                }
                if(role.name=='COMMON'){
                    this.construirMenuCommon();
                }
            });
        },
        construirMenuAdm(){
            this.itensCadastro = [];
            this.itensCadastro.push(['Usuário', 'mdi-account', 'cadastroUsuario']);
            this.itensCadastro.push(['Corretora', 'mdi-office-building', 'cadastroCorretora']);
            this.itensCadastro.push(['Ativo financeiro', 'mdi-finance', '']);
        },
        construirMenuCommon(){
            this.itensComum = [];
            this.itensComum.push(['Dashboards', 'mdi-view-dashboard', 'dashboard']);
            this.itensComum.push(['Movimentações', 'mdi-bank-transfer', 'movimentacoes']);
            this.itensComum.push(['Corretora', 'mdi-office-building', '' ]);
            this.itensComum.push(['Transações', 'mdi-cash-multiple', '' ]);
        },
        direcionarPagina(routeName){
            this.closeMenu();
            this.$router.push({ name: routeName });
        },
        closeMenu(){
            this.$store.dispatch('menuToogle', false);
        }
    }
  }
</script>