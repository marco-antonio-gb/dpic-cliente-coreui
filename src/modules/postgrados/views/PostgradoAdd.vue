<template>
<div>
    <goback class="mb-3"/>
    <form @submit.prevent="PostgradoStore" id="PostgradoStore">
        <!-- <p class="p-0 font-weight-bold">Informacion de postgrado</p> -->
        <CCard bodyWrapper class="mb-3">
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
                    <CInput label="Costo total del programa" placeholder="0000 " v-model="postgrado.precio" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Cantidad Pagos" placeholder="0" v-model="postgrado.cantidad_pagos" />
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
                <CCol sm="3">
                    <CInput label="Gestion academica"   v-model="postgrado.gestion" />
                </CCol>
            </CRow>
        </CCard>
        <!-- <p class="p-0 font-weight-bold">Asignar/Registrar Materias</p>
        <CCard bodyWrapper>
            <div class="text-center p-3" v-if="postgrado.materia_docente.length===0">
                <button class="btn btn-secondary " @click.prevent="addLinePagos(1)">Registrar Materias</button>
            </div>
            <div class="card-outline p-1 form-group mb-0" v-for="(input,k) in postgrado.materia_docente" :key="k">
                <div class="d-flex align-items-end  m-0 p-0">
    
                     <div class="p-1 w-50 ">
                        <label class=""> <strong>MATERIA/MODULO *</strong> </label>
                        <select required id="dropDown" class="form-control" v-model="input.materia_id">
                            <option value="null">Seleccionar materia</option>
                            <option v-for="materia in materias" :key="materia.id" v-bind:value="materia.idMateria">
                                {{materia.sigla}} - {{ materia.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="p-1 w-50 ">
                        <label class=""> <strong>DOCENTE *</strong> </label>
                        <select required id="dropDown" class="form-control" v-model="input.docente_id">
                            <option value="null">Seleccionar docente</option>
                            <option v-for="docente in docentes" :key="docente.id" v-bind:value="docente.idUsuario">
                                {{ docente.full_name }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-1">
                        <CButtonGroup>
                            <CButton color="secondary" size="sm" @click.prevent="removeInputPago(k)" v-show="k || ( !k && postgrado.materia_docente.length > 0)">
                                <CIcon name="cil-trash" />
                            </CButton>
                            <CButton color="dark" size="sm" @click.prevent="addLinePagos(k+2)" v-show="k == postgrado.materia_docente.length-1">
                                <CIcon name="cil-plus" />
                            </CButton>
                        </CButtonGroup>
                    </div>
                </div>
            </div>
        </CCard> -->
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
            postgrado: {
                nombre: '',
                fecha_inicio: '',
         
                cantidad_pagos: '',
                precio: '',
                gestion: new Date().getFullYear(),
                nivel_id: '',
                materia_docente:[]
            },
            niveles: [],
            docentes:[],
            materias:[],
           
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
        },
        getDocentes() {
            axios.get("/docentes")
                .then(response => {
                    this.docentes = response.data.data
                })
                .catch(e => {
                    console.log(e)
                })
        },
        getMaterias() {
            axios.get("/materias")
                .then(response => {
                    this.materias = response.data.data
                })
                .catch(e => {
                    console.log(e)
                })
        },
        removeInputPago(index) {
            this.postgrado.materia_docente.splice(index, 1);
        },
        addLinePagos(k) {
            let checkEmptyLines = this.postgrado.materia_docente.filter(
                line => line.item === null
            );
            if (
                checkEmptyLines.length >= 1 &&
                this.postgrado.materia_docente > 0
            )
                return;
            this.postgrado.materia_docente.push({
                // nombre: '',
                // sigla: ' ',
                materia_id: null,
                docente_id:null
            });
        },
    },
    mounted() {
        this.getNiveles()
        this.getDocentes()
        this.getMaterias()
    },
    
}
</script>
