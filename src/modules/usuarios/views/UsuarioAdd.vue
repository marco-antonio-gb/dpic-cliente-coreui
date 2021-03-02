<template>
<div>
    <div class="d-flex flex-row align-items-center mb-3">
        <div class="mr-2">
            <CButton size="sm" shape="pill" color="secondary" @click="$router.go(-1)" pressed>Volver</CButton>
        </div>
        <div>
            <h3 class="p-0 m-0 font-weight-bold">{{ $route.meta.title }}</h3>
        </div>
        <div></div>
    </div>
    <form @submit.prevent="UsuarioStore" id="PostgradoStore">
        <CCard bodyWrapper class="mb-2">
            <CRow>
                <CCol sm="4">
                    <CInput label="Paterno" type="text"   placeholder="Apellido Paterno" v-model="usuario.paterno" />
                </CCol>
                <CCol sm="4">
                    <CInput label="Materno" placeholder="Apellido Materno" type="text"   v-model="usuario.materno" />
                </CCol>
                <CCol sm="4">
                    <CInput label="Nombres" placeholder="Nombres" type="text" required v-model="usuario.nombres" />
                </CCol>
            </CRow>
            <CRow>
                <CCol sm="3">
                    <CInput label="C.I." placeholder="cedula " required v-model="usuario.ci" />
                </CCol>
              <CCol sm="3">
                    <div class="form-group">
                        <label for="uid-l744h660att" class=""> Externsion C.I. </label>
                        <select required id="dropDown" class="form-control" v-model="usuario.ci_ext">
                            <option disabled value="">Seleccione extension </option>
                            <option v-for="ext in options_ci" :key="ext.id" v-bind:value="ext.value">
                                {{ ext.text }}
                            </option>
                        </select>
                    </div>
                </CCol>
                 <CCol sm="3">
                    <CInput label="Celular" placeholder="celular" v-model="usuario.celular" />
                </CCol>
                 <CCol sm="3">
                    <CInput label="Telefono" placeholder="telefono" v-model="usuario.telefono" />
                </CCol>
            </CRow>
            <CRow>
               <CCol sm="2">
                    <CInput label="Titulo" placeholder="titulo" v-model="usuario.titulo_abrv" />
                </CCol>
               <CCol sm="4">
                    <CInput label="Profesion" placeholder="profesion" v-model="usuario.profesion" />
                </CCol>
               <CCol sm="3">
                    <CInput label="Correo *" type="email" required placeholder="email" v-model="usuario.email" />
                </CCol>
               <CCol sm="3">
                    <CInput label="Password *" required placeholder="password" type="password" v-model="usuario.password" />
                </CCol>
            </CRow>
            <CRow>
              <CCol sm="3">
                    <div class="form-group">
                        <label for="uid-l744h660att" class=""> Tipo usuario </label>
                        <select required id="dropDown" class="form-control" v-model="usuario.tipo_usuario_id" >
                            <option disabled value="">Seleccione tipo </option>
                            <option v-for="tipo in usuario_tipos" :key="tipo.id" v-bind:value="tipo.idTipoUsuario">
                                {{ tipo.nombre }}
                            </option>
                        </select>
                    </div>
                </CCol>
            </CRow>
        </CCard>
        <div class="text-right">
            <CButton class=" mr-2" color="secondary"     @click.prevent="CancelarUsuarioAdd">
                Cancelar
            </CButton>
            
            <CButton color="primary"  class="px-4  " type="submit" :disabled="isLoading">
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
import UsuarioService from '../services/UsuarioService'
import CustomUsuario from '../services/CustomUsuario'
export default {
    data() {
        return {
            isLoading: false,
            fixedToasts: 0,
            usuario_tipos:[],
            usuario: {
                paterno: '',
                materno: '',
                nombres: '',
                ci: '',
                ci_ext: '',
                telefono:'',
                celular: '',
                titulo_abrv:'',
                profesion: '',
                tipo_usuario_id: '',
                email: '',
                password:'',
            }, options_ci: [ 
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
    created(){
      this.getTipoUsuario()
    },
    mixins: [
        UsuarioService,
        CustomUsuario
    ],
    methods:{
      
    }
}
</script>
