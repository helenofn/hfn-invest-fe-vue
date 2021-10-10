<template>
<div>
    <v-card
        :loading="loading"
        class="mx-auto"
        max-width="1000"
    >

    <v-card-title>{{title}}</v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
            <v-row>
                <v-col cols="6" md="6">
                    <v-text-field
                        v-model="usuario.name"
                        :rules="[rules.required, rules.nomeMin]"
                        counter
                        maxlength="70"
                        hint=""
                        label="Nome Completo"
                    ></v-text-field>
                </v-col>
                <v-col cols="6" md="6">
                    <v-text-field
                        v-model="usuario.email"
                        :rules="[rules.required, rules.email]"
                        counter
                        maxlength="150"
                        hint=""
                        label="E-mail"
                    ></v-text-field>
                </v-col>
                <v-col cols="6" md="6">
                    <v-text-field v-if="isSignIn"
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
                <v-col cols="6" md="6">
                    <v-text-field v-if="isSignIn"
                        v-model="usuario.passwordConfirm"
                        :append-icon="showSenha ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.senhaMin, rules.senhaMax, ruleSenhaMatch]"
                        :type="showSenha ? 'text' : 'password'"
                        name="senha"
                        label="Senha"
                        hint=""
                        counter
                        @click:append="showSenha = !showSenha"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-container>
      </v-form>

    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn 
        color="deep-purple lighten-2"
        text
        @click="salvar"
      >
        Salvar
      </v-btn>
      <v-btn v-if="!isDialog && isSignIn"
        color="deep-purple lighten-2"
        text
        @click="redirecionarLogar"
      >
        Ir para Login
      </v-btn>
      <v-btn v-if="isDialog"
        color="deep-purple lighten-2"
        text
        @click="dialog.value = false"
      >
        Fechar
      </v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
import { create as createUser } from '@/services/userService.js';
export default{
    props:{
        tipo: String,
        isDialog: Boolean,
        dialog: Object,
        pUsuario: Object
    },
    data: () => ({
        title:'',
        isSignIn: false,
        valid: false,
        usuario:{
            name: 'Heleno Freitas Neto',
            email:'heleno.freitas@gmail.com',
            password:'12345678',
            passwordConfirm: '12345678'
        },
        loading: false,
        showSenha: false,
        rules: {
            required: v => !!v || 'Obrigatório.',
            nomeMin: v => v.length >= 3 || 'Min 3 caracteres',
            senhaMin: v => v.length >= 8 || 'Min 8 caracters',
            senhaMax: v => v.length <= 16 || 'Max 16 caracteres',
            email: v => /.+@.+/.test(v) || 'Informe um e-mail válido'
        },
    }),

    created(){
       //this.usuario = Object.assign({}, this.pUsuario);
       if(this.pUsuario){
         this.usuario = this.pUsuario; 
       }
      
        if(this.tipo=='signin'){
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
      salvar () {
        if(this.$refs.form.validate()){
            this.loading = true;
            setTimeout(() => (this.loading = false), 2000);
            //this.$http.post('auth/signIn',this.usuario)
            createUser(this.usuario)
                .then(() => {
                    this.$swal('Sucesso!','O seu usuário foi criado!','success');
                    if(this.isSignIn){
                      this.dialog.value = false;
                    }else{
                      this.$router.push({name: 'login'});
                    }
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
          return this.usuario.password == this.usuario.passwordConfirm || 'Senha e confirmação estão diferentes'
      }
    },
  }
</script>