<template>
<div>
    <div class="d-flex flex-row align-items-center mb-3">
        <div class="mr-2">
            <CButton size="sm" shape="pill" color="secondary" @click="$router.go(-1)" pressed>Volver</CButton>
        </div>
        <div>
            <h3 class="p-0 m-0">{{ $route.meta.title }}</h3>
        </div>
        <div></div>
    </div>
    <form @submit.prevent="PostgradoStore" id="PostgradoStore">
        <CCard bodyWrapper class="mb-2">
            <CRow>
                <CCol sm="6">
                    <CInput label="Nombre" required placeholder="Nombre del postgrado" v-model="postgrado.nombre" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Fecha Inicio" type="date" required v-model="postgrado.fecha_inicio" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Fecha Final" type="date" required v-model="postgrado.fecha_final" />
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
                    <CInput label="Gestion" readonly v-model="postgrado.gestion" />
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
    <CToaster position="bottom-right" :autohide="5000" v-if="show_toast">
        <CToast :show="show_toast" :header="`${$route.meta.title}`">
            {{message_toast}}
        </CToast>
    </CToaster>
</div>
</template>

<script>
import PostgradoService from '../services/PostgradoService'
import CustomService from '../services/CustomService'
export default {
    data() {
        return {
            isLoading: false,
            fixedToasts: 0,
            postgrado: {
                nombre: '',
                fecha_inicio: '',
                fecha_final: '',
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
        
    },
    watch: {
        show_toast() {
            return false
        }
    }
}
</script>
