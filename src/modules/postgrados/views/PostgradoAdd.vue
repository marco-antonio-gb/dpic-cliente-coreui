<template>
<div>
    <goback class="mb-3"/>
    <form @submit.prevent="PostgradoStore" id="PostgradoStore">
        <p class="p-0 font-weight-bold">Informacion de postgrado</p>
        <CCard bodyWrapper class="mb-3">
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
                    <CInput label="Gestion" readonly v-model="postgrado.gestion" />
                </CCol>
            </CRow>
        </CCard>
        <p class="p-0 font-weight-bold">Asignar/Registrar Materias</p>
        <CCard bodyWrapper>
            <div class="text-center p-3" v-if="postgrado.materias.length===0">
                <button class="btn btn-secondary " @click.prevent="addLinePagos(1)">Registrar Materias</button>
            </div>
            <div class="card-outline p-1 form-group mb-0" v-for="(input,k) in postgrado.materias" :key="k">
                <div class="d-flex align-items-end  m-0 p-0">
                    <div class="p-1 w-100 ">
                        <label class="control-label">Nombre materia: {{k+1}}</label>
                        <input type="text" class="form-control " placeholder="por concepto de..."   v-model="input.nombre" />
                    </div>
                    <div class="p-1 w-50 ">
                        <label class="control-label">Sigla</label>
                        <input type="text" class="form-control " placeholder="Costo"   v-model="input.sigla" />
                    </div>
                    <div class="p-1 w-50 ">
                         <label class="control-label">Credito:</label>
                        <input type="text" class="form-control " placeholder="Notas..." name="fecha_fin" v-model="input.credito" />
                       
                    </div>
                   
                    <div class="mb-1">
                        <CButtonGroup>
                            <CButton color="secondary" size="sm" @click.prevent="removeInputPago(k)" v-show="k || ( !k && postgrado.materias.length > 0)">
                                <CIcon name="cil-trash" />
                            </CButton>
                            <CButton color="dark" size="sm" @click.prevent="addLinePagos(k+2)" v-show="k == postgrado.materias.length-1">
                                <CIcon name="cil-plus" />
                            </CButton>
                        </CButtonGroup>
                    </div>
                </div>
            </div>
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
                nivel_id: '',
                materias:[]
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
        },
        removeInputPago(index) {
            this.postgrado.materias.splice(index, 1);
        },
        addLinePagos(k) {
            let label = 'Cuota Nro.  ';
            let checkEmptyLines = this.postgrado.materias.filter(
                line => line.item === null
            );
            if (
                checkEmptyLines.length >= 1 &&
                this.postgrado.materias > 0
            )
                return;
           
            this.postgrado.materias.push({
                nombre: '',
                sigla: ' ',
              
                credito: '',
            });
        },
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
