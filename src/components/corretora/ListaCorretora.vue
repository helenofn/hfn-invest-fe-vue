<template>
    <div>
        <PainelDrawer :p-options="painelOptions">
            <v-list-item>
                <v-list-item-content>
                    <v-form ref="form" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="12">
                                    <v-text-field
                                        v-model="filtro.internalId"
                                        counter
                                        maxlength="9"
                                        hint=""
                                        label="Código interno"
                                        dense
                                        @input="pesquisarSetTimeOut"
                                        @change="pesquisar"
                                    ></v-text-field>

                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field
                                        v-model="filtro.name"
                                        counter
                                        maxlength="150"
                                        hint=""
                                        label="Nome"
                                        dense
                                        @input="pesquisarSetTimeOut"
                                        @change="pesquisar"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field
                                        v-model="filtro.ein"
                                        counter
                                        maxlength="20"
                                        hint=""
                                        label="CNPJ"
                                        dense
                                        @input="pesquisarSetTimeOut"
                                        @change="pesquisar"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-list-item-content>
            </v-list-item>
        </PainelDrawer>
        <v-card class="mx-auto mb-2">
            <v-btn class="hfn-btn-filter" small @click="painelOptions.isActive=true">
                <v-icon smal>mdi-filter-outline</v-icon>
            </v-btn>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h5">
                        Corretoras
                    </v-list-item-title>
                    <v-list-item-subtitle>Cadastro de corretoras</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <v-data-table
                        :headers="headers"
                        :items="corretoras"
                        :page.sync="page"
                        :options.sync="options"
                        :server-items-length="total"
                        :loading="loading"
                        @page-count="pageCount = $event"
                        class="elevation-1"
                    >
                        <template v-slot:item.actions="{ item }">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                            <v-icon
                                small
                                class="mr-2"
                                @click="editItem(item)"
                                v-bind="attrs"
                                v-on="on"
                            >
                                mdi-pencil
                            </v-icon>
                            </template>
                            <span>Editar corretora</span>
                        </v-tooltip>
                        <v-tooltip bottom v-if="item.statusCode==1">
                            <template v-slot:activator="{ on, attrs }">
                            <v-icon small @click="ativarInativarItem(item)" v-bind="attrs" v-on="on">
                                mdi-close-circle-outline
                            </v-icon>
                            </template>
                            <span>Inativar corretora</span>
                        </v-tooltip>
                        <v-tooltip bottom v-if="item.statusCode==2">
                            <template v-slot:activator="{ on, attrs }">
                            <v-icon v-if="item.statusCode==2" small @click="ativarInativarItem(item)" v-bind="attrs" v-on="on">
                                mdi-restart
                            </v-icon>
                            </template>
                            <span>Ativar corretora</span>
                        </v-tooltip>
                        </template>
                    </v-data-table>
                    <div class="text-center pt-2">
                        <v-pagination
                            v-model="page"
                            :length="pageCount"
                        ></v-pagination>
                    </div>
                </v-list-item-content>
            </v-list-item>

        </v-card>

    </div>
</template>

<script>
//import Corretora from '@/components/corretora/Corretora.vue';
import PainelDrawer from '@/components/painel/PainelDrawer.vue';
import { getAllPage as getAllPageBroker } from '@/services/brokerService.js';

export default {
    components:{
        PainelDrawer,
        //Corretora
    },
    data(){
        return {
            filtro:{internalId:null, name: '', ein: ''},
            painelOptions:{isActive:false},
            v_pesquisarSetTimeOut: null,
            headers: [
                { text: 'Id', align: 'start', sortable: true, value: 'seqId',},
                { text: 'Id Interno', value: 'internalId' },
                { text: 'Nome', value: 'name' },
                { text: 'CNPJ', value: 'ein' },
                { text: 'Ações', value: 'actions', sortable: false },
            ],
            corretoras: [],
            page: 1,
            pageCount: 0,
            total:0,
            loading:false,
            options:{}
        }
    },
    mounted () {
        this.getDataFromApi();
    },
    methods:{
        getDataFromApi (){
            this.corretoras = [];
            this.loading=true;
            getAllPageBroker(this.options, this.filtro)
            .then(response =>{
                this.corretoras = response.data.content;
                this.total = response.data.totalElements;
                this.pageCount = response.data.totalPages;
                this.loading=false;
            })
            .catch(error =>{
                console.log(error);
                this.loading=false;
            });


            this.loading=false;

        },
        pesquisarSetTimeOut(){
            clearTimeout(this.v_pesquisarSetTimeOut);
            this.v_pesquisarSetTimeOut = setTimeout(this.pesquisar, 1000);
        },
        pesquisar(){
            this.getDataFromApi();
        },
        editItem () {
            
        },
        ativarInativarItem(){
            
        },
    }
}
</script>