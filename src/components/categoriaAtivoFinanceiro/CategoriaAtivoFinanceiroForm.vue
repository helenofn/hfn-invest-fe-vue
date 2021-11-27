<template>
<div>
    <v-list-item>
        <v-list-item-content>
            <v-form ref="form" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-text-field
                                v-model="categoria.name"
                                counter
                                maxlength="100"
                                hint=""
                                label="Nome"
                                dense
                                @input="onInput"
                                @change="onChange"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                            <v-text-field
                                v-model="categoria.description"
                                counter
                                maxlength="500"
                                hint=""
                                label="Descrição"
                                dense
                                @input="onInput"
                                @change="onChange"
                            ></v-text-field>
                        </v-col>

                    </v-row>
                    <v-row>
                        <v-btn v-if="pOptions.showBtnSave"
                            small
                            @click="onSave()"
                        >     
                            <v-icon smal>mdi-checkbox-marked-circle-plus-outline</v-icon>Salvar
                        </v-btn>
                    </v-row>
                </v-container>
            </v-form>
        </v-list-item-content>
    </v-list-item>
</div>
</template>

<script>
import { categoriaAtivoFinanceiroDto } from '@/dto/categoriaAtivoFinanceiroDto.js'

export default {
    props:{
        pOptions: Object
    },
    data() {
        return {
            categoria: {...categoriaAtivoFinanceiroDto}
        }
    },
    methods:{
        /*pesquisarSetTimeOut(){
            clearTimeout(this.v_pesquisarSetTimeOut);
            this.v_pesquisarSetTimeOut = setTimeout(this.pesquisar, 1000);        
        },*/
        onInput(){
            if(this.pOptions && this.pOptions.onInputExecuteFunction){
                this.$emit(this.pOptions.onInputExecuteFunction,this.categoria);
            }
        },
        onChange(){
            if(this.pOptions && this.pOptions.onChangeExecuteFunction){
                this.$emit(this.pOptions.onChangeExecuteFunction,this.categoria);
            }
        },
        onSave(){
            if(this.pOptions && this.pOptions.onSaveExecuteFunction){
                 this.$emit(this.pOptions.onSaveExecuteFunction,this.categoria);
            }
        }
    }
}
</script>