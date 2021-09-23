<template>
<div>
    <v-card
        :loading="loading"
        class="mx-auto my-12"
        max-width="1000"
    >

    <v-card-title>Sign In</v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
            <v-row>
                <v-col cols="6" md="6">
                    <v-text-field
                        v-model="usuario.nome"
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
                    <v-text-field
                        v-model="usuario.senha"
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
                    <v-text-field
                        v-model="usuario.confirmaSenha"
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
      <v-btn 
        color="deep-purple lighten-2"
        text
        @click="logar"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
  export default {
    data: () => ({
        valid: false,
        usuario:{
            nome: '',
            email:'',
            senha:'',
            confirmaSenha: ''
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

    methods: {
      salvar () {
        if(this.$refs.form.validate()){
            this.loading = true
            setTimeout(() => (this.loading = false), 2000)
        }
      },
      logar(){
          this.$router.push({name:'login'});
      },
      ruleSenhaMatch(){
          return this.usuario.senha == this.usuario.confirmaSenha || 'Senha e confirmação estão diferentes'
      }
    },
  }
</script>