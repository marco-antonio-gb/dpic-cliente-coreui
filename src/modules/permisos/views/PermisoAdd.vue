<template>
<div>
    <goback class="mb-3" />
    <form @submit.prevent="PermisoStore">
        <CCard bodyWrapper class="mb-2">
            <CRow>
                <CCol sm="6">
                    <CInput label="Nombre" required placeholder="Nombre del materia" v-model="permiso.name" />
                </CCol>
                <CCol sm="6">
                    <CInput label="Descripcion" placeholder="Descripcion " v-model="permiso.descripcion" />
                </CCol>
            </CRow>
            <CRow>
            </CRow>
        </CCard>
        <div class="text-right">
            <button class="btn btn-secondary mr-2" @click.prevent="cancelarPermisoAdd">Cancelar</button>
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
import PermisoService from '../services/PermisoService'
import ToastProps from '@/components/ShowToast'
export default {
    data() {
        return {
            isLoading: false,
            permiso: {
                name: '',
                guard_name: 'api',
                descripcion: '',
            },
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: '',
        }
    },
    mixins: [
        PermisoService,
    ],
    components: {
        ToastProps
    },
}
</script>
