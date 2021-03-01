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
                  <label>CI Ext</label>
                    <select class="custom-select" v-model="postgraduante.ci_ext">
                        <option value="">Extension C.I.</option>
                        <option value="La Paz">La Paz</option>
                        <option value="Oruro">Oruro</option>
                        <option value="Potosi">Potosi</option>
                        <option value="Cochabamba">Cochabamba</option>
                        <option value="Chuquisaca">Chuquisaca</option>
                        <option value="Tarija">Tarija</option>
                        <option value="Santa Cruz">Santa Cruz</option>
                        <option value="Beni">Beni</option>
                        <option value="Pando">Pando</option>
                    </select>
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
                    <CInput readonly label="Fecha Registro"  v-model="postgraduante.fecha_inscripcion" />
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
    <CToaster position="bottom-right" :autohide="5000" v-if="show_toast">
        <CToast :show="show_toast" :header="`${$route.meta.title}`">
            {{message_toast}}
        </CToast>
    </CToaster>
    <pre>{{postgraduante}}</pre>
</div>
</template>
<script>
import PostgraduanteService from '../services/PostgraduanteService'
import CustomPostgraduante from '../services/CustomPostgraduante'
export default {
    data() {
        return {
            isLoading: false,
            fixedToasts: 0,
            postgraduante: {
                paterno: 'PATERNO',
                materno: 'MATERNO',
                nombres: 'NOMBRES',
                ci: '5779558',
                ci_ext: 'Oruro',
                lugar_nac: 'Oruro',
                fecha_nac: '2021-12-12',
                direc_domicilio: 'DIRECCION DE LA CASA DE LOS USAURIOS',
                nro_domicilio: '18',
                telf_domicilio: '5251814',
                celular: '71856386',
                correo: 'modem@gmail.com',
                profesion: 'INGENEIR DE SITEMAS',
                lugar_trabajo: 'FNI',
                telf_trabajo: '52584444',
                lugar_estudio: 'FCEFA',
                observaciones: 'SIN OBSERVACIONES',
                fecha_inscripcion: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                foto: '',
            },
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
}
</script>
