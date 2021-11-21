<template>
<div>
    <div class="hfn-painel" :class="{active:pOptions.isActive}">
        <v-icon class="hfn-btn-close" @click="pOptions.isActive=false">mdi-close-circle-outline</v-icon>
        <slot></slot>
    </div>
</div>
</template>

<script>
export default{
    props:{
        pOptions: Object
    },
    data(){
        return {
            
        }
    }
}
</script>

<style scoped>

    .hfn-painel{
        position: absolute;
        top: 5px;
        max-width: 350px;
        width: 90%;
        height: 100%;
        background-color: #fff;
        right: -100%;
        box-shadow: 0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%);
        z-index: 1;
        transition: all 1s;
    }

    .hfn-painel.active{
        right: 0px;
    }

    .hfn-btn-close{
        margin: 10px;
    }

</style>