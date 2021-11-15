<template>
  <div>
    <v-card
      class="mx-auto mb-2"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h5">
            Usuários
          </v-list-item-title>
          <v-list-item-subtitle>Cadastro de usuários</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mx-4"></v-divider>
      <v-list-item>
        <v-list-item-content>
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
                      dense
                      @input="pesquisarSetTimeOut"
                      @change="pesquisar"
                    ></v-text-field>

                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="filtro.email"
                    counter
                    maxlength="70"
                    hint=""
                    label="E-mail"
                    dense
                    @input="pesquisarSetTimeOut"
                    @change="pesquisar"
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
                    dense
                    @change="pesquisar"
                  >          
                  </v-combobox>
                </v-col>

              </v-row>
            </v-container>
          </v-form>
          
          
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mx-4"></v-divider>
      <v-list-item>
        <v-list-item-content>
        
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
                <span>Editar usuário</span>
              </v-tooltip>
              <v-tooltip bottom v-if="item.status.code==1">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon small @click="ativarInativarItem(item)" v-bind="attrs" v-on="on">
                    mdi-close-circle-outline
                  </v-icon>
                </template>
                <span>Inativar usuário</span>
              </v-tooltip>
              <v-tooltip bottom v-if="item.status.code==2">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-if="item.status.code==2" small @click="ativarInativarItem(item)" v-bind="attrs" v-on="on">
                    mdi-restart
                  </v-icon>
                </template>
                <span>Ativar usuário</span>
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
import { getAllPage as getAllPageUsers, update as updateUser } from '@/services/userService.js';
import { usuarioDto } from '@/dto/usuarioDto.js';
import { statusUserListAll } from '@/services/dominioService.js';
import UserStatusEnum from '@/enums/UserStatusEnum.js';

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
      usuarios: [],
      v_pesquisarSetTimeOut:null
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

      ativarInativarItem(item){
        item.status = item?.status?.code == UserStatusEnum.ATIVO.code ? UserStatusEnum.INATIVO : UserStatusEnum.ATIVO;
        let message = item?.status?.code==UserStatusEnum.ATIVO.code ? 'ativado':'inativado'
        updateUser(item)
        .then(() => {
            this.$swal('Sucesso!','O seu usuário foi '+message+'!','success')
        })
        .catch(error => {
          this.$swal('Ops!',error.msgErro,'error');
        });


      },

      fetchData (route){
        console.log(route);
      },

      getDataFromApi (){
        this.loading=true;
        getAllPageUsers(this.options, this.filtro)
          .then(response =>{
            this.usuarios = response.data.content;
            this.total = response.data.totalElements;
            this.pageCount = response.data.totalPages;
            this.loading = false;
          })
          .catch(error =>{
            console.log(error);
          });

      },
      pesquisarSetTimeOut(){
        clearTimeout(this.v_pesquisarSetTimeOut);
        this.v_pesquisarSetTimeOut = setTimeout(this.pesquisar, 1000);
      },
      pesquisar(){
        this.getDataFromApi();
      },
      limpar(){
        this.filtro = usuarioDto;
      },
      listarStatusUser(){
        statusUserListAll()
        .then((response)=>{
          this.userStatusList = response.data;
        }).catch(error => {
          console.log(error);
        });
      },
      
    },
  }
</script>