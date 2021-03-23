<template>
<div>
    <div class="d-flex justify-content-between align-items-center p-1 pb-3">
        <h3 class="p-0 m-0 font-weight-bold">
            <CIcon name="cil-justify-center" /> {{$route.meta.title}}</h3>
        <button class="btn btn-primary" @click="$router.push({path:'/usuarios/add'})"> Nuevo Usuario</button>
    </div>
    <CCard>
         
        <CCardBody class="card-body-custom ">
            <CDataTable :items="usuarios" :fields="fields" :tableFilter='{ placeholder : "Buscar registros", label : "Bucar" }' :items-per-page-select='{label:"Items por pagina"}' :items-per-page="5" sorter pagination :loading='isLoading' hover>
                <template #full_name="{item}" >
                    <td>
                        <router-link class="custom-link" :to="{ name: 'usuarios-detail', params: { idUsuario: item.idUsuario }}" v-slot="{ href,navigate }" custom>
                            <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                               
                                {{item.full_name}}
                            </a> 
                        </router-link>
                        <br>
                            <small>{{item.profesion}}</small>
                    </td>
                </template>
                <template #roles="{item}">
                    <td>
                        <span class="badge badge-light mr-1 text-uppercase rounded p-1" v-for="rol in item.roles" :key="rol.id"> {{rol.name}}</span>
                         
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
                                <CIcon name="cil-user"></CIcon>
                            </CButton>
                            <CButton color="dark" size="sm" @click="handleClick(item.idUsuario)">
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
import CustomUsuario from '../services/CustomUsuario'
import UsuarioService from '../services/UsuarioService'
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
        label: 'Roles',

        key: 'roles'
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
            usuarios: [],
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
        this.UsuarioIndex()
    },
    mounted() {},
    mixins: [
        UsuarioService,
        CustomUsuario
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
