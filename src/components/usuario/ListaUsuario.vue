<template>
  <div>
  <v-card
    class="mx-auto mb-2"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          Usuários
        </v-list-item-title>
        <v-list-item-subtitle>Cadastro de usuários</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>


  <v-card
    class="mx-auto mb-2"
  >
    <v-form ref="form" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
              <v-text-field
                v-model="filtro.name"
                counter
                maxlength="70"
                hint=""
                label="Nome"
              ></v-text-field>

          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="filtro.email"
              counter
              maxlength="70"
              hint=""
              label="E-mail"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-combobox
              v-model="filtro.status"
              :items="userStatusList"
              label="Situação"
              item-text="name"
              counter
              hint=""
              return-object
            >          
            </v-combobox>
          </v-col>

        </v-row>
      </v-container>
    </v-form>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="pesquisar"
      >Pesquisar</v-btn>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="limpar"
      >Limpar</v-btn>
    </v-card-actions>

  </v-card>

  
  <v-data-table
    :headers="headers"
    :items="usuarios"
    :page.sync="page"
    :options.sync="options"
    :server-items-length="total"
    :loading="loading"
    @page-count="pageCount = $event"
    class="elevation-1"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="alert('teste')"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
  <div class="text-center pt-2">
    <v-pagination
      v-model="page"
      :length="pageCount"
    ></v-pagination>
  </div>
    <v-dialog
      v-model="userDialog.value"
      max-width="500px"
    >
      <Usuario :p-is-dialog="true" :p-dialog="userDialog" tipo="" :p-usuario="usuario"></Usuario>
    </v-dialog>
  </div>
</template>

<script>
import Usuario from '@/components/usuario/Usuario.vue'
import { getAllPage as getAllPageUsers } from '@/services/userService.js';
import { usuarioDto } from '@/dto/usuarioDto.js';
import { statusUserListAll } from '@/services/dominioService.js';
//import { paginationDto } from '@/dto/paginationDto.js';

  export default {
    components:{
        Usuario
    },
    data: () => ({
      filtro: usuarioDto,
      userStatusList: [],
      page: 1,
      pageCount: 0,
      total:0,
      loading:true,
      options:{},
      usuario:usuarioDto,
      userDialog: {
        value:false
      },
      dialogDelete: false,
      headers: [
        {
          text: 'Nome',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'E-mail', value: 'email' },
        { text: 'Situação', value: 'status.name' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      usuarios: []
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    created (){
      this.listarStatusUser();
    },

    mounted () {
      this.getDataFromApi()
    },

    watch: {
      options: {
        handler () {
          this.getDataFromApi()
        },
        deep: true,
      },
    },

    methods: {
      editItem (item) {
        this.usuario = item;
        this.userDialog.value = true
      },

      fetchData (route){
        console.log(route);
      },

      getDataFromApi (){
        console.log('getDataFromApi');
        this.loading=true;
        getAllPageUsers(this.options, this.filtro)
          .then(response =>{
            console.log(response);
            this.usuarios = response.data.content;
            this.total = response.data.totalElements;
            this.pageCount = response.data.totalPages;
            this.loading = false;
            console.log(this.usuarios);
          })
          .catch(error =>{
            console.log(error);
          });

      },
      pesquisar(){
        console.log('Pesquisar');
        this.getDataFromApi();
      },
      limpar(){
        console.log('limpar');
        this.filtro = usuarioDto;
      },
      listarStatusUser(){
        statusUserListAll()
        .then((response)=>{
          console.log(response.data);
          this.userStatusList = response.data;
        }).catch(error => {
          console.log(error);
        });
      },
      
    },
  }
</script>