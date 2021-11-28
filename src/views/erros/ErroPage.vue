<template>
    <div>
        <div v-if="tipo == 'NAO_AUTORIZADO'">
            Usuário não autorizado
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tipo: this.$route.params.pTipo
        }
    }
}
</script>