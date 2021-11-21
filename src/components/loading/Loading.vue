<template>
<div v-if="isLoading">
    <div class="hfn-block-loading">
        <div class="text-center">
            <v-progress-circular class="hfn-icon-loading" indeterminate></v-progress-circular>
        </div>
    </div>
</div>  
</template>

<script>
export default {
    data(){
        return {
        }
    },
    computed:{
        isLoading(){
            return this.$store.getters.isLoading;
        }
    }
}
</script>

<style>
    .hfn-block-loading{
        width: 100%;
        height: 100%;
        position: fixed;
        background-color:rgba(0,0,0,0.9);
        z-index: 100;
        overflow: hidden;
        opacity : 0.5;
    }

    .hfn-icon-loading{
        position: absolute;
        top:50%;
        margin: auto;
        width: 100%;
        color: #fff;
        z-index: 101;
    }
</style>