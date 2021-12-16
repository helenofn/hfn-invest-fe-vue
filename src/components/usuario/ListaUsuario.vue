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
                <v-col cols="12" sm="12">
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
                <v-col cols="12" sm="12">
                  <v-combobox
                    :items="userStatusList"
                    label="Situação"
                    clearable
                    item-text="name"
                    item-value="name"
                    counter
                    hint=""
                    dense
                    @change="filtro.statusCode = $event?$event.code:null; pesquisar()"
                  >          
                  </v-combobox>
                </v-col>

              </v-row>
            </v-container>
          </v-form>
        </v-list-item-content>
      </v-list-item>
       
    </PainelDrawer>




    <v-card
      class="mx-auto mb-2"
    >

    <v-btn class="hfn-btn-filter"
      small
      @click="painelOptions.isActive=true"
    >     
      <v-icon smal>mdi-filter-outline</v-icon>
    </v-btn>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h5">
            Usuários
          </v-list-item-title>
          <v-list-item-subtitle>Cadastro de usuários</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

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
              <v-tooltip bottom v-if="item.statusCode==1">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon small @click="ativarInativarItem(item)" v-bind="attrs" v-on="on">
                    mdi-close-circle-outline
                  </v-icon>
                </template>
                <span>Inativar usuário</span>
              </v-tooltip>
              <v-tooltip bottom v-if="item.statusCode==2">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-if="item.statusCode==2" small @click="ativarInativarItem(item)" v-bind="attrs" v-on="on">
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
import { usuarioRequestDto, filterUserRequestDto } from '@/dto/usuarioDto.js';
import { statusUserListAll } from '@/services/dominioService.js';
import UserStatusEnum from '@/enums/UserStatusEnum.js';
import PainelDrawer from '@/components/painel/PainelDrawer.vue';

  export default {
    components:{
        PainelDrawer,
        Usuario
    },
    data: () => ({
      filtro: {...filterUserRequestDto},
      userStatusList: [],
      page: 1,
      pageCount: 0,
      total:0,
      loading:true,
      options:{},
      usuario: {...usuarioRequestDto},
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
        { text: 'Situação', value: 'statusName' },
        { text: 'Roles', value: 'roles' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      usuarios: [],
      v_pesquisarSetTimeOut:null,
      painelOptions:{isActive:false}
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
        this.usuario = item.usuarioApi;
        this.userDialog.value = true
      },

      ativarInativarItem(item){
        let itemApi = item.usuarioApi;
        itemApi.statusCode = itemApi?.statusCode == UserStatusEnum.ATIVO.code ? UserStatusEnum.INATIVO.code : UserStatusEnum.ATIVO.code;
        let message = itemApi?.statusCode==UserStatusEnum.ATIVO.code ? 'ativado':'inativado'
        updateUser(itemApi)
        .then(() => {
            this.$swal('Sucesso!','O usuário foi '+message+'!','success')
            this.getDataFromApi();
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
            //this.usuarios = response.data.content;
            this.montarUsuarios(response.data.content);
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
        this.filtro = usuarioRequestDto;
      },
      listarStatusUser(){
        statusUserListAll()
        .then((response)=>{
          this.userStatusList = response.data;
        }).catch(error => {
          console.log(error);
        });
      },
      montarUsuarios(usuariosApi){
        this.usuarios = [];
        usuariosApi.forEach(usuarioApi => {
          let usuario = {
            name: usuarioApi.name,
            email: usuarioApi.email,
            statusCode: usuarioApi.statusCode,
            statusName: usuarioApi.statusName,
            roles: this.montarStringRoles(usuarioApi.roles),
            usuarioApi: usuarioApi
          }
          this.usuarios.push(usuario);
        });
      },
      montarStringRoles(roles){
        let strRole = '';
        if(roles){
          roles.forEach(role => {
            strRole = strRole + role.name + ', ';
          });
        }
        return strRole.substring(0, strRole.length - 2);
      }
      
    },
  }
</script>