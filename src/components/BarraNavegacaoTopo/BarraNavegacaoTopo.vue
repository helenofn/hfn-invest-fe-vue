<template>
    <v-app-bar app
        dense
    >
        <v-toolbar-title>LULEKE Invest</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn value="recent">
            <span>Login</span>
        </v-btn>
            <router-link >
            <span>Dashboard</span>
            <v-icon>mdi-view-dashboard</v-icon>
            </router-link>
            
         <v-btn value="recent">
            <span>Movimentação Bancária</span>
        </v-btn>
        <v-btn value="recent">
            <span>Extrato Corretora</span>
        </v-btn>
        <v-btn value="recent">
            <span>Movimentação Ativos</span>
        </v-btn>
    </v-app-bar>
</template>

