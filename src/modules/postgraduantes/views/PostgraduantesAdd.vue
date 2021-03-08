<template>
<div>
    <goback class="mb-3"/>
    <form @submit.prevent="PostgraduanteStore" id="PostgradoStore">
        <CCard bodyWrapper class="mb-2">
            <CRow>
                <CCol sm="4">
                    <CInput label="Paterno" type="text" required placeholder="Apellido Paterno" v-model="postgraduante.paterno" />
                </CCol>
                <CCol sm="4">
                    <CInput label="Materno" placeholder="Apellido Materno" type="text" required v-model="postgraduante.materno" />
                </CCol>
                <CCol sm="4">
                    <CInput label="Nombres" placeholder="Nombres" type="text" required v-model="postgraduante.nombres" />
                </CCol>
            </CRow>
            <CRow>
                <CCol sm="3">
                    <CInput label="C.I." placeholder="cedula " v-model="postgraduante.ci" />
                </CCol>
                <CCol sm="3">
                    <div class="form-group">
                        <label   class=""> Externsion C.I. </label>
                        <select required id="dropDown" class="form-control" v-model="postgraduante.ci_ext">
                            <option disabled value="">Seleccione extension </option>
                            <option v-for="ext in options_ci" :key="ext.id" v-bind:value="ext.value">
                                {{ ext.text }}
                            </option>
                        </select>
                    </div>
                </CCol>
                <CCol sm="3">
                    <CInput label="Lugar Nacimiento" placeholder="lugar" v-model="postgraduante.lugar_nac" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Fecha nacimiento" type="date" placeholder="lugar" v-model="postgraduante.fecha_nac" />
                </CCol>
            </CRow>
            <CRow>
                <CCol sm="6">
                    <CInput label="Direccion Domicilio" placeholder="direccion" v-model="postgraduante.direc_domicilio" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Nro Domicilio" placeholder="nro" v-model="postgraduante.nro_domicilio" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Telefono Domicilio" placeholder="telefono fijo" v-model="postgraduante.telf_domicilio" />
                </CCol>
            </CRow>
            <CRow>
                <CCol sm="6">
                    <CInput label="Celular" placeholder="celular" v-model="postgraduante.celular" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Correo" placeholder="email" v-model="postgraduante.correo" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Profesion" placeholder="profesion" v-model="postgraduante.profesion" />
                </CCol>
            </CRow>
            <CRow>
                <CCol sm="4">
                    <CInput label="Lugar Trabajo" placeholder="trabajo" v-model="postgraduante.lugar_trabajo" />
                </CCol>
                <CCol sm="4">
                    <CInput label="Telefono Trabajo" placeholder="telf-trabajo" v-model="postgraduante.telf_trabajo" />
                </CCol>
                <CCol sm="4">
                    <CInput label="Lugar Estudio" placeholder="lugar estudio" v-model="postgraduante.lugar_estudio" />
                </CCol>
            </CRow>
            <CRow>
                <CCol sm="8">
                    <CInput label="Observaciones" placeholder="observaciones" v-model="postgraduante.observaciones" />
                </CCol>
                <CCol sm="4">
                    <CInput readonly label="Fecha Registro" v-model="postgraduante.fecha_inscripcion" />
                </CCol>
            </CRow>
        </CCard>
        <div class="text-right">
            <button class="btn btn-secondary mr-2" @click.prevent="resetForm">Cancelar</button>
            <CButton color="primary" class="px-4  " type="submit" :disabled="isLoading">
                <CSpinner color="warning" size="sm" v-if="isLoading" />
                <span v-if="isLoading">
                    Procesando...</span>
                <span v-else> Guardar informacion </span>
            </CButton>
        </div>
    </form>
       <ToastProps :show_toast='show_toast' :color_toast='color_toast' :message_toast='message_toast' />
<pre>{{postgraduante}}</pre>
</div>
</template>

<script>

import PostgraduanteService from '../services/PostgraduanteService'
import CustomPostgraduante from '../services/CustomPostgraduante'
import ToastProps from '@/components/ShowToast'

export default {
    data() {
        return {
            isLoading: false,
            fixedToasts: 0,
            postgraduante: {
                paterno: '',
                materno: '',
                nombres: '',
                ci: '',
                ci_ext: '',
                lugar_nac: '',
                fecha_nac: '',
                direc_domicilio: '',
                nro_domicilio: '',
                telf_domicilio: '',
                celular: '',
                correo: '',
                profesion: '',
                lugar_trabajo: '',
                telf_trabajo: '',
                lugar_estudio: '',
                observaciones: '',
                fecha_inscripcion: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
                foto: '',
            },
            options_ci: [ 
                {
                    value: "OR",
                    text: "ORURO"
                },
                {
                    value: "LP",
                    text: "LA PAZ"
                },
                {
                    value: "PT",
                    text: "POTOSI"
                },
                {
                    value: "CB",
                    text: "COCHABAMBA"
                },
                {
                    value: "CH",
                    text: "CHUQUISACA"
                },
                {
                    value: "TJ",
                    text: "TARIJA"
                },
                {
                    value: "SC",
                    text: "SANTA CRUZ"
                },
                {
                    value: "BN",
                    text: "BENI"
                },
                {
                    value: "PD",
                    text: "PANDO"
                }
            ],
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: ''
        }
    },
    mixins: [
        PostgraduanteService,
        CustomPostgraduante
    ],
    components:{
        ToastProps
    }
}
</script>
