<template>
<div>
    <div class="d-flex justify-content-between align-items-center   mb-3">
        <goback />
        <button class="btn btn-primary" @click="$router.push({path:'/permisos/add'})"> Nuevo permiso</button>
    </div>
    <CCard>
        <CCardBody class="card-body-custom ">
            <CDataTable :items="permisos" :fields="fields" :tableFilter='{ placeholder : "Buscar registros", label : "Bucar" }' :items-per-page-select='{label:"Items por pagina"}' :items-per-page="5" sorter pagination :loading='isLoading' hover size="sm">
                <template #opciones="{item }">
                    <td class="py-2">
                        <CButtonGroup>
                            <CButton color="secondary" size="sm" @click="$router.push({path:'/permisos/update/'+item.id})">
                                Edit
                            </CButton>
                            <CButton color="dark" size="sm" @click="deletePermiso(item.id)">
                                <CIcon name="cil-trash"></CIcon>
                            </CButton>
                        </CButtonGroup>
                    </td>
                </template>
            </CDataTable>
        </CCardBody>
    </CCard>
    <ToastProps :show_toast='show_toast' :color_toast='color_toast' :message_toast='message_toast' />
</div>
</template>
<script>
import PermisoService from '../services/PermisoService'
import ToastProps from '@/components/ShowToast'
 
const fields = [{
        label: 'Nombre',
        key: 'name',
    },
    {
        label: 'Descripcion',
        key: 'descripcion'
    },
    {
        key: 'opciones',
        label: 'Opciones',
        _style: 'width:1%',
        sorter: false,
        filter: false
    }
]
export default {
    data() {
        return {
            permisos: [],
            isLoading: false,
            total: '0',
            fields,
            postgrados: [],
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: ''
        }
    },
    created() {
           this.getPermisos()
    },
    mixins: [
        PermisoService,
         
    ],
    components: {
        ToastProps
    }
}
</script>
<style>
</style>
