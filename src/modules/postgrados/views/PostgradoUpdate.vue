<template>
<div>
    <goback class="mb-3"/>
    <form @submit.prevent="PostgradoUpdate($route.params.idPostgrado)" id="PostgradoUpdate">
        <CCard bodyWrapper class="mb-2">
            <CRow>
                <CCol sm="9">
                    <CInput label="Nombre" required placeholder="Nombre del postgrado" v-model="postgrado.nombre" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Fecha Inicio" type="date" required v-model="postgrado.fecha_inicio" />
                </CCol>
                
            </CRow>
            <CRow>
                <CCol sm="3">
                    <CInput label="Precio" placeholder="0000 " v-model="postgrado.precio" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Cantidad Pagos" placeholder="0" v-model="postgrado.cantidad_pagos" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Gestion"   v-model="postgrado.gestion" />
                </CCol>
                <CCol sm="3">
                    <div class="form-group">
                        <label for="uid-l744h660att" class=""> Nivel </label>
                        <select required id="dropDown" class="form-control" v-model="postgrado.nivel_id">
                            <option value="">Seleccionar nivel</option>
                            <option v-for="nivel in niveles" :key="nivel.id" v-bind:value="nivel.idNivel">
                                {{ nivel.nombre }}
                            </option>
                        </select>
                    </div>
                </CCol>
            </CRow>
        </CCard>
        <div class="text-right">
            <button class="btn btn-secondary mr-2" @click.prevent="cancelarPostgrado">Cancelar</button>
            <CButton color="primary" class="px-4  " type="submit" :disabled="isLoading">
                <CSpinner color="warning" size="sm" v-if="isLoading" />
                <span v-if="isLoading">
                    Procesando...</span>
                <span v-else> Guardar informacion </span>
            </CButton>
        </div>
    </form>
    <ToastProps  :show_toast='show_toast' :color_toast='color_toast' :message_toast='message_toast' />
   
</div>
</template>

<script>
import PostgradoService from '../services/PostgradoService'
import CustomService from '../services/CustomService'
import ToastProps from '@/components/ShowToast'
export default {
    data() {
        return {
            isLoading: false,
            fixedToasts: 0,
            postgrado: {
                nombre: '',
                fecha_inicio: '',
          
                cantidad_pagos: '',
                precio: '',
                gestion: new Date().getFullYear(),
                nivel_id: ''
            },
            niveles: [],
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: ''
        }
    },
    mixins: [
        PostgradoService,
        CustomService
    ],
    components:{
        ToastProps
    },
    methods: {
        addFixedToast() {
            this.fixedToasts++
        },
        getNiveles() {
            axios.get("/niveles")
                .then(response => {
                    this.niveles = response.data.data
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    mounted() {
        this.getNiveles()
        this.PostgradoShow(this.$route.params.idPostgrado);
    },
    watch: {
        show_toast() {
            return false
        }
    }
}
</script>
