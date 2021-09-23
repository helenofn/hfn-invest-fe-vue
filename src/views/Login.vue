<template>
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
                        v-model="usuario.email"
                        :rules="[rules.required, rules.email]"
                        counter
                        maxlength="50"
                        hint="É a sua chave de acesso"
                        label="E-mail"
                    ></v-text-field>
                    <v-text-field
                        v-model="usuario.senha"
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
      <v-btn block
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >
        Entrar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
        valid: false,
        usuario:{
            email:'',
            senha:''
        },
        loading: false,
        showSenha: false,
        rules: {
            required: value => !!value || 'Obrigatório.',
            min: v => v.length >= 8 || 'Min 8 characters',
            email: v => /.+@.+/.test(v) || 'Informe um e-mail válido'
        },
    }),

    methods: {
      reserve () {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>