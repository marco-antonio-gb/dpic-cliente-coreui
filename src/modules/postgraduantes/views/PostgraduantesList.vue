<template>
<div>
    <div class="d-flex justify-content-between align-items-center p-1 pb-3">
        <h3 class="p-0 m-0 font-weight-bold"><CIcon name="cil-justify-center" /> {{$route.meta.title}}</h3>
        <button class="btn btn-primary" @click="$router.push({path:'/postgraduantes/add'})"> Nuevo postgraduante</button>
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
            <CDataTable :items="postgraduantes" :fields="fields" :tableFilter='{ placeholder : "Buscar registros", label : "Bucar" }' :items-per-page-select='{label:"Items por pagina"}' :items-per-page="5" sorter pagination :loading='isLoading' hover  size="sm">
                <template #nombre="{item}">
                    <td>
                        <router-link class="custom-link" :to="{ name: 'postgraduante-detail', params: { idPostgraduante: item.idPostgraduante }}" v-slot="{ href,navigate }" custom>
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
                            <CButton color="light" size="sm" @click="$router.push({path:'/postgraduantes/detail/'+item.idPostgraduante})">
                                <CIcon name="cil-user"></CIcon>
                            </CButton>
                            <CButton color="secondary" size="sm" @click="$router.push({path:'/postgraduantes/update/'+item.idPostgraduante})">
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
import PostgraduanteService from '../services/PostgraduanteService'
const fields = [{
        label: 'Paterno',
        key: 'paterno',
    },
    {
        label:'Materno',
        key: 'materno'
    },
    {
        label:'Nombres',
        key: 'nombres'
    },
    {
        label:'C.I.',
        key: 'ci'
    },
    {
        key: 'celular'
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
                    text: 'Postgraduantes',
                     
                },
            ],
            postgraduantes: [],
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
        PostgraduanteService
    ],
    created() {
        this.PostgraduanteIndex()
    },
}
</script>
