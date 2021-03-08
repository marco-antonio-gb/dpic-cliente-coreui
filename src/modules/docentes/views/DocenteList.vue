<template>
<div>
    <div class="d-flex justify-content-between align-items-center p-1 pb-3">
        <h3 class="p-0 m-0 font-weight-bold">
            <CIcon name="cil-justify-center" /> {{$route.meta.title}}</h3>
        <button class="btn btn-primary" @click="$router.push({path:'/usuarios/add'})"> Nuevo Usuario</button>
    </div>
    <CCard>
        <CCardHeader>
            <span class="badge badge-secondary">{{total}}</span> Registros en total
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
            <CDataTable :items="docentes" :fields="fields" :tableFilter='{ placeholder : "Buscar registros", label : "Bucar" }' :items-per-page-select='{label:"Items por pagina"}' :items-per-page="5" sorter pagination :loading='isLoading' hover>
                <template #full_name="{item}">
                    <td>
                        <router-link class="custom-link" :to="{ name: 'detalleUsuario', params: { idUsuario: item.idUsuario }}" v-slot="{ href,navigate }" custom>
                            <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                <CIcon name="cilLink"></CIcon>
                                {{item.full_name}}
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
                            <CButton color="light" size="sm" @click="$router.push({path:'/usuarios/update/'+item.idUsuario})">
                                <CIcon name="cil-pencil"></CIcon>
                            </CButton>
                            <CButton color="secondary" size="sm" @click="$router.push({path:'/usuarios/detail/'+item.idUsuario})">
                                <CIcon name="cil-trash"></CIcon>
                            </CButton>
                            <CButton color="dark" size="sm" @click="$router.push({path:'/usuarios/delete/'+item.idUsuario})">
                                <CIcon name="cil-user"></CIcon>
                            </CButton>
                        </CButtonGroup>
                    </td>
                </template>
                <!-- <template #details="{item}">
            <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
                <CCardBody>
                    <CMedia :aside-image-props="{ height: 102 }">
                        <h4>
                            {{item.username}}
                        </h4>
                        <p class="text-muted">User since: {{item.registered}}</p>
                        <CButton size="sm" color="info" class="">
                            User Settings
                        </CButton>
                        <CButton size="sm" color="danger" class="ml-1">
                            Delete
                        </CButton>
                    </CMedia>
                </CCardBody>
            </CCollapse>
        </template> -->
            </CDataTable>
        </CCardBody>
        <CToaster :autohide="3000">
            <template v-for="toast in fixedToasts">
                <CToast :key="'toast' + toast" :show="true" header="CToast fixed component">
                    Hello, world! This is a <b>toast</b> number {{toast}}.
                </CToast>
            </template>
        </CToaster>
        <!-- <pre>{{usuarios.data}}</pre> -->
    </CCard>
</div>
</template>
<script>
// import CustomUsuario from '../services/CustomUsuario'
import DocenteService from '../services/DocenteService'
const fields = [
    // {
    //     key: 'nombres',
    // },
    // {
    //     key: 'materno',
    // },
    {
        label: 'Nombre completo',
        key: 'full_name',
    },
    {
        key: 'email'
    },
    {
        key: 'profesion'
    },
    {
        key: 'celular'
    },
    {
        key: 'activo'
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
    name: 'AdvancedTables',
    data() {
        return {
            docentes: [],
            items: '',
            isLoading: false,
            fields,
            details: [],
            collapseDuration: 0,
            fixedToasts: 0,
            total: ''
        }
    },
    created() {
        this.DocenteIndex()
    },
    mounted() {},
    mixins: [
        DocenteService,
        // CustomUsuario
    ],
    methods: {
        getBadge(status) {
            switch (status) {
                case 1:
                    return 'success'
                case 'Inactive':
                    return 'secondary'
                case 'Pending':
                    return 'warning'
                case 0:
                    return 'danger'
                default:
                    'primary'
            }
        },
        getLable(status) {
            switch (status) {
                case 1:
                    return 'Activo'
                case 0:
                    return 'Bloqueado'
                default:
                    'Sin definir'
            }
        },
        toggleDetails(item) {
            this.$set(this.items[item.id], '_toggled', !item._toggled)
            this.collapseDuration = 300
            this.$nextTick(() => {
                this.collapseDuration = 0
            })
        },
        addFixedToast() {
            this.fixedToasts++;
        },
        handleClick(id) {
            this.$confirm({
                title: 'Confirmar accion',
                message: `Esta seguro(a) que desea eliminar el usuario?`,
                button: {
                    no: 'No',
                    yes: 'Eliminar'
                },
                callback: confirm => {
                    if (confirm) {
                        this.UsuarioDestroy(id)
                    }  
                }
            })
        }
    },
}
</script>
