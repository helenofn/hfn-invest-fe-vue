<template>
  <v-data-table
    :headers="headers"
    :items="usuarios"
    sort-by="name"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Usuários</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4 mt-8"
          append-icon="mdi-magnify"
        ></v-text-field>
        <v-dialog
          v-model="dialog.value"
          max-width="500px"
        >
            <Usuario :is-dialog="true" :dialog="dialog" tipo="" :p-usuario="usuario"></Usuario>
        </v-dialog>
      </v-toolbar>
    </template>
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
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import Usuario from '@/components/usuario/Usuario.vue'
import { getAll as getAllUsers } from '@/services/userService.js';
  export default {
    components:{
        Usuario
    },
    data: () => ({
      usuario:null,
      search: '',
      dialog: {
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
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        status: ''
      },
      defaultItem: {
        name: '',
        email: '',
        status: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {

        getAllUsers()
          .then(response =>{
            this.usuarios = response.data;
          })
          .catch(error =>{
            console.log(error);
          });
      },

      editItem (item) {
        this.usuario = item;
        //this.editedIndex = this.usuarios.indexOf(item)
        //this.editedItem = Object.assign({}, item)
        //this.usuario = Object.assign({}, item);
        this.dialog.value = true
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.usuarios[this.editedIndex], this.editedItem)
        } else {
          this.usuarios.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>