<template>
<div>
    <goback class="mb-3" />
    <form @submit.prevent="RolUpdate($route.params.idRol)">
        <CCard bodyWrapper class="mb-2">
            <CRow>
                <CCol sm="6">
                    <CInput label="Nombre" required placeholder="Nombre del rol" v-model="rol.name" />
                </CCol>
                <CCol sm="6">
                    <CInput label="Credito" placeholder="credito " v-model="rol.descripcion" />
                </CCol>
            </CRow>
            <CRow>
            </CRow>
        </CCard>
        <CCard bodyWrapper class="mb-2">
             <multiselect v-model="permisos" tag-placeholder="Add this as new tag" placeholder="Seleccione un permiso" label="name" track-by="name" :options="load_permisos" :multiple="true" :taggable="true" :close-on-select="false" :clear-on-select="false"></multiselect>
        </CCard>
        <div class="text-right">
            <button class="btn btn-secondary mr-2" @click.prevent="cancelarRolUpdate">Cancelar</button>
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
import RolService from '../services/RolService'
import ToastProps from '@/components/ShowToast'
import Multiselect from 'vue-multiselect'

export default {
    data() {
        return {
            isLoading: false,
            rol: {
                name: '',
                guard_name: 'api',
                descripcion: '',
                permisos:[]
            },
            permisos:[],
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: '',
            load_permisos:[]
        }
    },
    mixins: [
        RolService,
    ],
    components: {
        ToastProps,
        Multiselect
    },
    created(){
      this.RolShow(this.$route.params.idRol)
      this.getPermisos()
    },
     methods: {
        getPermisos() {
            axios.get("/permisos").then(reponse => {
                this.load_permisos = reponse.data.data
            }).catch(error => {
                console.log(error)
            })
        }
    },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
