<template>
<div>
    <v-card
        :loading="loading"
        class="mx-auto"
    >

    <v-card-title>{{title}}</v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
            <v-row>
                <v-col cols="12" md="12">
                    <v-text-field
                        v-model="usuario.name"
                        :rules="[rules.required, rules.nomeMin]"
                        counter
                        maxlength="70"
                        hint=""
                        label="Nome Completo"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                    <v-text-field
                        v-model="usuario.email"
                        :rules="[rules.required, rules.email]"
                        counter
                        maxlength="150"
                        hint=""
                        label="E-mail"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="12" v-if="isSignIn">
                    <v-text-field
                        v-model="usuario.password"
                        :append-icon="showSenha ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.senhaMin, rules.senhaMax]"
                        :type="showSenha ? 'text' : 'password'"
                        name="senha"
                        label="Senha"
                        hint=""
                        counter
                        @click:append="showSenha = !showSenha"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="12" v-if="isSignIn">
                    <v-text-field
                        v-model="passwordConfirm"
                        :append-icon="showSenha ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.senhaMin, rules.senhaMax, ruleSenhaMatch]"
                        :type="showSenha ? 'text' : 'password'"
                        name="senhaConfirm"
                        label="Confirmar Senha"
                        hint=""
                        counter
                        @click:append="showSenha = !showSenha"
                    ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="12" v-if="!isSignIn">
                    <v-combobox
                      v-model="usuario.status"
                      :items="userStatusList"
                      label="Situação"
                      item-text="name"
                      return-object
                    >
                    </v-combobox>
                </v-col>
                <v-col cols="12" md="12" v-if="!isSignIn">
                  <v-select
                    v-model="usuario.roles"
                    :items="roles"
                    item-text="name"
                    label="Roles"
                    multiple
                    chips
                    return-object
                  ></v-select>
                </v-col>
            </v-row>
        </v-container>
      </v-form>

    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn v-if="isSignIn"
        color="deep-purple lighten-2"
        text
        @click="salvar"
      >
        Salvar
      </v-btn>
      <v-btn v-if="!isSignIn"
        color="deep-purple lighten-2"
        text
        @click="alterar"
      >
        Salvar
      </v-btn>
      <v-btn v-if="!pIsDialog && isSignIn"
        color="deep-purple lighten-2"
        text
        @click="redirecionarLogar"
      >
        Ir para Login
      </v-btn>
      <v-btn v-if="pIsDialog"
        color="deep-purple lighten-2"
        text
        @click="pDialog.value = false"
      >
        Fechar
      </v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
import { create as createUser, update as updateUser } from '@/services/userService.js';
import { statusUserListAll, roleUserListAll } from '@/services/dominioService.js';
import { usuarioDto } from '@/dto/usuarioDto.js';
export default{
    props:{
        pTipo: String,
        pIsDialog: Boolean,
        pDialog: Object,
        pUsuario: Object
    },
    data: () => ({
        title:'',
        isSignIn: false,
        valid: false,
        usuario:usuarioDto,
        passwordConfirm:'',
        loading: false,
        showSenha: false,
        rules: {
            required: v => !!v || 'Obrigatório.',
            nomeMin: v => v.length >= 3 || 'Min 3 caracteres',
            senhaMin: v => v.length >= 8 || 'Min 8 caracters',
            senhaMax: v => v.length <= 16 || 'Max 16 caracteres',
            email: v => /.+@.+/.test(v) || 'Informe um e-mail válido'
        },
        userStatusList:[],
        roles:[]
    }),

    created(){
      this.listarStatusUser();
      this.listarRoles();

       if(this.pUsuario){
         this.usuario = this.pUsuario;
         this.usuario = Object.assign({}, this.pUsuario);
       }
      
        if(this.pTipo=='signin'){
            this.title='Sign In';
            this.isSignIn = true;
        }else{
            this.title='Alterar Usuário';
            this.isSignIn = false;
        }
    },

    watch: { 
      pUsuario: function(newVal) {
        this.usuario = newVal;
      }
    },

    methods: {
      listarStatusUser(){
        statusUserListAll()
        .then((response)=>{
          this.userStatusList = response.data;
        });
      },
      listarRoles(){
        roleUserListAll()
        .then((response) => {
          this.roles = response.data;
        });
      },
      salvar () {
        if(this.$refs.form.validate()){
            this.loading = true;
            setTimeout(() => (this.loading = false), 2000);
            //this.$http.post('auth/signIn',this.usuario)
            createUser(this.usuario)
                .then(() => {
                    this.$swal('Sucesso!','O usuário foi criado!','success');
                    if(this.pIsDialog){
                      this.pDialog.value = false;
                    }else{
                      this.$router.push({name: 'login'});
                    }
                })
                .catch(error => {
                  this.$swal('Ops!',error.msgErro,'error');
                });
        }
      },
      alterar(){
        if(this.$refs.form.validate()){
            this.loading = true;
            setTimeout(() => (this.loading = false), 2000);
            //this.$http.post('auth/signIn',this.usuario)
            updateUser(this.usuario)
                .then(() => {
                    this.$swal('Sucesso!','O seu usuário foi alterado!','success')
                      .then(function(){
                          window.location.reload();
                      });
                })
                .catch(error => {
                  this.$swal('Ops!',error.msgErro,'error');
                });
        }
      },
      redirecionarLogar(){
          this.$router.push({name:'login'});
      },
      ruleSenhaMatch(){
          return this.usuario.password == this.passwordConfirm || 'Senha e confirmação estão diferentes'
      }
    },
  }
</script>