<template>
<div>
    <div class="d-flex justify-content-between align-items-center p-1 pb-3">
        <h3 class="p-0 m-0 font-weight-bold">
            <CIcon name="cil-justify-center" /> {{$route.meta.title}}</h3>
        <button class="btn btn-primary" @click="$router.push({path:'/postgrados/add'})"> Nuevo postgrado</button>
    </div>
    <CCard>
        <!-- <CCardHeader class="d-flex justify-content-between align-items-center">
            <span>{{total}} Registros en total</span> 
            <div class="card-header-actions">
                <span class="text-muted">Exportar: </span>
                <CButtonGroup>
                    <CButton color="light" size="sm">
                        PDF
                    </CButton>
                    <CButton color="light" size="sm">
                        Excel
                    </CButton>
                </CButtonGroup>
            </div>
        </CCardHeader> -->
        <CCardBody class="card-body-custom ">
            <CDataTable :items="postgrados" :fields="fields" :tableFilter='{ placeholder : "Buscar registros", label : "Bucar" }' :items-per-page-select='{label:"Items por pagina"}' :items-per-page="5" sorter pagination :loading='isLoading' hover size="sm">
                <template #nombre="{item}">
                    <td>
                        <router-link class="custom-link" :to="{ name: 'postgrados-detail', params: { idPostgrado: item.idPostgrado }}" v-slot="{ href,navigate }" custom>
                            <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                <CIcon name="cilLink" size="sm"></CIcon>
                                {{item.nombre}}
                            </a>
                        </router-link>
                    </td>
                </template>
                <template #activo="{item}">
                    <td>
                        <CBadge :color="getBadge(item.activo)">
                            {{getLable(item.activo)}}
                        </CBadge>
                    </td>
                </template>
                <template #opciones="{item }">
                    <td class="py-2">
                        <CButtonGroup>
                            <CButton color="light" size="sm" @click="$router.push({path:'/postgrados/detail/'+item.idPostgrado})">
                                <CIcon name="cil-user"></CIcon>
                            </CButton>
                            <CButton color="secondary" size="sm" @click="$router.push({path:'/postgrados/update/'+item.idPostgrado})">
                                <CIcon name="cil-pencil"></CIcon>
                            </CButton>
                            <CButton color="dark" size="sm" @click="handleClick(item.idPostgrado)">
                                <CIcon name="cil-trash"></CIcon>
                            </CButton>
                        </CButtonGroup>
                    </td>
                </template>
            </CDataTable>
        </CCardBody>
               <ToastProps  :show_toast='show_toast' :color_toast='color_toast' :message_toast='message_toast' />
    </CCard>
</div>
</template>
<script>
import PostgradoService from '../services/PostgradoService'
import CustomService from '../services/CustomService'
import ToastProps from '@/components/ShowToast'
const fields = [{
        label: 'Postgrado',
        key: 'nombre',
    },
    {
        label: 'Fecha Inicio',
        key: 'fecha_inicio'
    },
   
    {
        label: '# Pagos',
        key: 'cantidad_pagos'
    },
    {
        key: 'gestion'
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
    name: 'postgrados-list',
    data() {
        return {
            postgrados: [],
            isLoading: false,
            fields,
            total: 0,
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
    components:{
        ToastProps
    },
    created() {
        this.PostgradoIndex()
    },
}
</script>
