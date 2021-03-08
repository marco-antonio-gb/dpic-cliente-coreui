<template>
<div>
    <goback class="mb-3"/>
    <form @submit.prevent="UsuarioUpdate($route.params.idUsuario)" id="PostgradoStore">
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
              
               <CCol sm="6">
                    <CInput label="Profesion" placeholder="profesion" v-model="usuario.profesion" />
                </CCol>
               <CCol sm="3">
                    <CInput label="Correo *" type="email" required placeholder="email" v-model="usuario.email" />
                </CCol>
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
      <ToastProps :show_toast='show_toast' :color_toast='color_toast' :message_toast='message_toast' />

    
</div>
</template>
<script>
import UsuarioService from '../services/UsuarioService'
import CustomUsuario from '../services/CustomUsuario'
import ToastProps from '@/components/ShowToast'

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
            usuario_tipos:[],
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: ''
        }
    },
    created(){
      this.getTipoUsuario();
      this.UsuarioShow(this.$route.params.idUsuario);
    },
    mixins: [
        UsuarioService,
        CustomUsuario
    ],
    components:{
      ToastProps
    }
}
</script>
