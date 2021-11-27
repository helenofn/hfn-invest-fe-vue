<template>
    <div>
        <PainelFiltro :p-options="painelFiltroOptions">
            <CategoriaFiltroForm
                :p-options="formFiltroOptions"
                @pesquisar="pesquisar"
                @pesquisarSetTimeOut="pesquisarSetTimeOut"
            >
            </CategoriaFiltroForm>
        </PainelFiltro>
        <PainelNovo :p-options="painelNovoOptions">
            <CategoriaEditForm
                :p-options="formEditOptions"
                @salvar="salvar"
            >
            </CategoriaEditForm>
        </PainelNovo>


        <v-card
            class="mx-auto mb-2"
        >

            <v-btn class="hfn-btn-filter"
                small
                @click="painelNovoOptions.isActive=true"
                >     
                <v-icon smal>mdi-plus</v-icon>
            </v-btn>

            <v-btn class="hfn-btn-filter"
                small
                @click="painelFiltroOptions.isActive=true"
                >     
                <v-icon smal>mdi-filter-outline</v-icon>
            </v-btn>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h5">Categoria de ativo financeiro</v-list-item-title>
                    <v-list-item-subtitle>Cadastro de categorias de ativo financeiro</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>

    </div>
</template>
<script>
import PainelDrawer from '@/components/painel/PainelDrawer.vue';
import CategoriaAtivoFinanceiroForm from '@/components/categoriaAtivoFinanceiro/CategoriaAtivoFinanceiroForm.vue';
import { create as categoriaSave } from '@/services/FinancialAssetCategoryService.js'

export default{
    components:{
        'PainelFiltro':PainelDrawer,
        'PainelNovo':PainelDrawer,
        'CategoriaFiltroForm':CategoriaAtivoFinanceiroForm,
        'CategoriaEditForm':CategoriaAtivoFinanceiroForm
    },
    data(){
        return {
            painelFiltroOptions:{isActive:false},
            painelNovoOptions:{isActive:false},
            formFiltroOptions:{
                onChangeExecuteFunction:'pesquisar', 
                onInputExecuteFunction:'pesquisarSetTimeOut',
                showBtnSave: false
            },
            formEditOptions:{
                onSaveExecuteFunction:'salvar',
                showBtnSave:true
            },
            v_pesquisarSetTimeOut: null
        }
    },
    methods:{
        pesquisarSetTimeOut(categoriaForm){
            clearTimeout(this.v_pesquisarSetTimeOut);
            this.v_pesquisarSetTimeOut = setTimeout(this.pesquisar(categoriaForm), 1000);
        },
        pesquisar(categoriaForm){
            alert('pesquisar',categoriaForm.name);
        },
        salvar(categoriaForm){
            let cat = {...categoriaForm};
            console.log(cat);
            categoriaSave(cat).then((response) =>{
                console.log(response.data);
            })
            .catch((error) => {
                this.$swal('Ops!',error.msgErro,'error');
            });
        }
    }
}
</script>