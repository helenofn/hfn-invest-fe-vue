<template>
<div>
    <v-card
        :loading="loading"
        class="mx-auto my-12"
        max-width="374"
    >

    <v-card-title>Login</v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      
      <v-form v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="12" md="12">
                    <v-text-field
                        v-model="usuario.username"
                        :rules="[rules.required, rules.email]"
                        counter
                        maxlength="150"
                        hint="É a sua chave de acesso"
                        label="E-mail"
                    ></v-text-field>
                    <v-text-field
                        v-model="usuario.password"
                        :append-icon="showSenha ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
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
        @click="entrar"
        :disabled="!valid"
      >Entrar</v-btn>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="siginDialog.value = true"
      >Sign In</v-btn>
    </v-card-actions>
  </v-card>

  <v-dialog
        v-model="siginDialog.value"
        transition="dialog-bottom-transition"
        max-width="500"
  >
    <Usuario :is-dialog="true" :dialog="siginDialog" tipo="signin"></Usuario>
  </v-dialog>
</div>
</template>

<script>
import Usuario from '@/components/usuario/Usuario.vue'

  export default {
    data: () => ({
        siginDialog: {
          value: false
        },
        valid: false,
        usuario:{
            username:'heleno.freitas@gmail.com',
            password:'12345678'
        },
        loading: false,
        showSenha: false,
        rules: {
            required: value => !!value || 'Obrigatório.',
            min: v => v.length >= 8 || 'Min 8 characters',
            email: v => /.+@.+/.test(v) || 'Informe um e-mail válido'
        }
    }),

    components:{
      Usuario
    },

    methods: {
      entrar () {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
        this.$store.dispatch('efetuarLogin', this.usuario)
                .then(()=> {
                    this.$router.push({name:'dashboard'});
                    this.mensagemErro = '';
                })
                .catch(error => {
                    this.$swal('Ops!',error.msgErro,'error');
                });
      }
    },
  }
</script>