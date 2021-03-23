<template>
<div>
    <goback class="mb-3" />
    <form @submit.prevent="UsuarioStore" id="PostgradoStore">
        <CCard bodyWrapper class="mb-2">
            <CRow>
                <CCol sm="4">
                    <CInput label="Paterno" type="text" placeholder="Apellido Paterno" v-model="usuario.paterno" />
                </CCol>
                <CCol sm="4">
                    <CInput label="Materno" placeholder="Apellido Materno" type="text" v-model="usuario.materno" />
                </CCol>
                <CCol sm="4">
                    <CInput label="Nombres *" placeholder="Nombres" type="text" required v-model="usuario.nombres" />
                </CCol>
            </CRow>
            <CRow>
                <CCol sm="3">
                    <CInput label="C.I. *" placeholder="cedula " required v-model="usuario.ci" />
                </CCol>
                <CCol sm="3">
                    <div class="form-group">
                        <label for="uid-l744h660att" class=""> Externsion C.I. * </label>
                        <select required id="dropDown" class="form-control" v-model="usuario.ci_ext">
                            <option disabled value="">Seleccione extension </option>
                            <option v-for="ext in options_ci" :key="ext.id" v-bind:value="ext.value">
                                {{ ext.text }}
                            </option>
                        </select>
                    </div>
                </CCol>
                <CCol sm="3">
                    <CInput label="Celular *" placeholder="celular" v-model="usuario.celular" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Telefono" placeholder="telefono" v-model="usuario.telefono" />
                </CCol>
            </CRow>
            <CRow>
                <CCol sm="4">
                    <CInput label="Profesion" placeholder="profesion" v-model="usuario.profesion" />
                </CCol>
                <CCol sm="4">
                    <CInput label="Correo *" type="email" required placeholder="email" v-model="usuario.email" />
                </CCol>
                <CCol sm="4">
                    <CInput label="Password *" required placeholder="password" type="password" v-model="usuario.password" />
                </CCol>
            </CRow>
            <CRow>
                <CCol sm="12">
                    <label class="typo__label font-weight-bold">Roles de usuario *</label>
                    <multiselect v-model="usuario.roles" tag-placeholder="Add this as new tag" required  placeholder="Seleccione un permiso" label="name" track-by="name" :options="roles" :multiple="true" :taggable="true" :close-on-select="false" :clear-on-select="false"></multiselect>
                </CCol>
                 <CCol>
                    <div class="alert alert-primary mt-3" v-if="usuario.roles.length>0">
                        <small>Detalle de Roles:</small>
                        <p class="m-1" v-for="rol in usuario.roles" :key="rol.id"> <strong>{{rol.name}}</strong>: {{rol.descripcion}}</p>
                    </div>
                    <div class="alert alert-secondary mt-3" v-else>
                        <p class="m-1" > Ningun Rol seleccionado </p>
                    </div>
                </CCol>
            </CRow>
        </CCard>
        <div class="text-right">
            <CButton class=" mr-2" color="secondary" @click.prevent="CancelarUsuarioAdd">
                Cancelar
            </CButton>
            <CButton color="primary" class="px-4  " type="submit" :disabled="isLoading">
                <CSpinner color="warning" size="sm" v-if="isLoading" />
                <span v-if="isLoading">
                    Procesando...</span>
                <span v-else> Guardar informacion </span>
            </CButton>
        </div>
    </form>
    <ToastProps :show_toast='show_toast' :color_toast='color_toast' :message_toast='message_toast' />
 
</div>
</template>
<script>
import UsuarioService from '../services/UsuarioService'
import CustomUsuario from '../services/CustomUsuario'
import ToastProps from '@/components/ShowToast'
import Multiselect from 'vue-multiselect'
export default {
    data() {
        return {
            isLoading: false,
            fixedToasts: 0,
            roles: [],
            usuario: {
                paterno: '',
                materno: '',
                nombres: '',
                ci: '',
                ci_ext: '',
                telefono: '',
                celular: '',
                profesion: '',
                email: '',
                password: '',
                roles: '',
            },
            options_ci: [{
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
    created() {
        this.getTipoUsuario()
    },
    components: {
        ToastProps,
        Multiselect
    },
    mixins: [
        UsuarioService,
        CustomUsuario
    ],
}
</script>
