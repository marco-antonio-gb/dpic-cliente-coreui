<template>
<div>
    <goback class="mb-3" />
    <CRow>
        <CCol sm="6">
            <CCard>
                <CCardHeader>
                    Informacion del Rol
                </CCardHeader>
                <CCardBody>
                    <h3>{{rol.name}}</h3>
                    <p>{{rol.descripcion}}</p>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol sm="6">
            <CCard>
                <CCardHeader>
                    Permisos
                </CCardHeader>
                <CCardBody>
                    <span class="badge badge-pill badge-secondary" v-for="permiso in permisos" :key="permiso.id">{{permiso.name}}</span>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
 
    <ToastProps :show_toast='show_toast' :color_toast='color_toast' :message_toast='message_toast' />
</div>
</template>
<script>
import RolService from '../services/RolService'
import ToastProps from '@/components/ShowToast'
export default {
    data() {
        return {
            isLoading: false,
            rol: {
                name: '',
                guard_name: 'api',
                descripcion: '',
            },
            permisos: [],
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: '',
        }
    },
    mixins: [
        RolService,
    ],
    components: {
        ToastProps
    },
    created() {
        this.RolShow(this.$route.params.idRol)
    }
}
</script>
<style scoped>
.badge-pill {
    padding-right: 1em;
    padding-left: 1em;
    border-radius: 10rem;
    margin-left: 5px;
    margin-bottom: 5px;
    font-size: 0.8rem;
}
</style>
