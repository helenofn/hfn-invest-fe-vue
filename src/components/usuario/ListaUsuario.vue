<template>
<div>
    <v-card>
    <v-card-title>
      Usuários
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>

</div>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Nome',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Email', value: 'email' },
          { text: 'Status', value: 'status' }
        ],
        desserts: [
          {
            name: 'Heleno Freitas Neto',
            email: 'heleno.freitas@gmail.com',
            status: 'Ativo'
          },
          {
            name: 'Heleno Freitas Neto',
            email: 'heleno.freitas@gmail.com',
            status: 'Ativo'
          },
          {
            name: 'Heleno Freitas Neto',
            email: 'heleno.freitas@gmail.com',
            status: 'Ativo'
          },
          {
            name: 'Heleno Freitas Neto',
            email: 'heleno.freitas@gmail.com',
            status: 'Ativo'
          }
        ],
      }
    },
  }
</script>