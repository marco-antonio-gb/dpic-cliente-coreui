<template>
<div>
    <div class="d-flex justify-content-between align-items-center p-1 pb-3">
        <h3 class="p-0 m-0 font-weight-bold"><CIcon name="cil-justify-center" /> {{$route.meta.title}}</h3>
        <button class="btn btn-primary" @click="$router.push({path:'/postgrados/add'})"> Nuevo postgrado</button>
    </div>
    <CCard>
        <CCardHeader>
             <span class="badge badge-secondary">{{total}}</span>  Registros en total
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
        </CCardHeader>
        <CCardBody class="card-body-custom ">
            <CDataTable :items="postgrados" :fields="fields" :tableFilter='{ placeholder : "Buscar registros", label : "Bucar" }' :items-per-page-select='{label:"Items por pagina"}' :items-per-page="5" sorter pagination :loading='isLoading' hover  size="sm">
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
                            <CButton color="dark" size="sm"  >
                                <CIcon name="cil-trash"></CIcon>
                            </CButton>
                        </CButtonGroup>
                    </td>
                </template>
            </CDataTable>
        </CCardBody>
        <CToaster :autohide="3000">
            <template v-for="toast in fixedToasts">
                <CToast :key="'toast' + toast" :show="true" header="CToast fixed component">
                    Hello, world! This is a <b>toast</b> number {{toast}}.
                </CToast>
            </template>
        </CToaster>
    </CCard>
</div>
</template>
<script>
import PostgradoService from '../services/PostgradoService'
const fields = [{
        label: 'Postgrado',
        key: 'nombre',
    },
    {
        label:'Fecha Inicio',
        key: 'fecha_inicio'
    },
    {
        label:'Fecha Final',
        key: 'fecha_final'
    },
    {
        label:'# Pagos',
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
            items: [{
                    text: 'Inicio',
                    to: '/'
                },
                {
                    text: 'Postgrados',
                    to:'/postgrados'
                },
            ],
            postgrados: [],
            // items: '',
            isLoading: false,
            fields,
            details: [],
            collapseDuration: 0,
            fixedToasts: 0,
            total:''
        }
    },
    mixins: [
        PostgradoService
    ],
    created() {
        this.PostgradoIndex()
    },
}
</script>
