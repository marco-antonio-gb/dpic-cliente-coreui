<template>
<div>
    <!-- <goback class="mb-3" /> -->
    <!-- <CCard bodyWrapper>
        <div class="d-flex justify-content-between ">
                <div>
                    <p class="text-dark m-0">Detalle de postgraduantes registrados</p>
                    <h5 class="font-weight-bold"> {{inscritos.postgrado}}</h5>
                </div>
                <div>
                    <CDropdown color="primary" toggler-text="Opciones" class="m-2">
                        <CDropdownItem>First Action</CDropdownItem>
                        <CDropdownItem>Second Action</CDropdownItem>
                        <CDropdownItem>Third Action</CDropdownItem>
                        <CDropdownDivider></CDropdownDivider>
                        <CDropdownItem>Something else here...</CDropdownItem>
                        <CDropdownItem disabled>Disabled action</CDropdownItem>
                    </CDropdown>
                </div>
            </div>
    </CCard> -->
    <CCard v-if="inscritos">
        <CCardHeader>
            <strong> Postgraduantes inscritos</strong>
        </CCardHeader>
        <CCardBody class="pt-0 pb-0">
            <CDataTable :items="inscritos" :fields="fields" size="sm" :tableFilter='{ placeholder : "Buscar registros", label : "Bucar" }' items-per-page-select :items-per-page="7" hover sorter pagination class="pb-0" >
           
                <template #full_name="{item}">
                    <td>
                        <CIcon name="cil-user" class="mr-1" /> {{item.full_name}}
                    </td>
                </template>
                <template #opciones="{item}">
                    <td class="text-right">
                        <CButtonGroup>
                            <CButton color="light" size="sm" @click="$router.push({path:'/postgrados/detalle-pagos/'+$route.params.idPostgrado+'/postgraduante/'+item.idPostgraduante})">
                                <CIcon name="cil-dollar"></CIcon> Lista Pagos
                            </CButton>
                            <CButton color="secondary" size="sm" @click="$router.push({path:'/postgrados/detail/'+$route.params.idPostgrado+'/postgraduantes/calificaciones-postgraduante/'+item.idPostgraduante})">
                                <CIcon name="cil-print"></CIcon> Notas
                            </CButton>
                            <!-- postgrados/detail/:idPostgrado/pagos/registrar-pago-postgraduante/:idPostgraduante -->
                            <CButton color="dark" size="sm" @click="$router.push({path:'/postgrados/detail/'+$route.params.idPostgrado+'/pagos/registrar-pago-postgraduante/'+item.idPostgraduante})">
                                <CIcon name="cil-dollar"></CIcon> Registrar Pago
                            </CButton>
                        </CButtonGroup>
                    </td>
                </template>
            </CDataTable>
        </CCardBody>
    </CCard>
    <CCard v-else>
        <CCardBody class="text-center">
            <span>No se registraron postgraduantes</span>
        </CCardBody>
    </CCard>
</div>
</template>

<script>
import CustomService from '../../services/CustomService'
const fields = [

    {
        label: 'Nombre completo',
        key: 'full_name',
    },
    {
        label: 'Cedula',
        key: 'cedula'
    },
    {
        key: 'celular'
    },
    {
        key: 'opciones',
        label: 'Opciones',
        _style: ' text-align: right',
        sorter: false,
        filter: false
    }
]
export default {
    data() {
        return {
            // inscritos: {},
            fields
        }
    },
    // mounted() {
    //     this.getPostgraduantesInscritos(this.$route.params.idPostgrado);
    // },
     props: {
        inscritos: {
            type: Array,
            default: []
        },
        
    },
    
    mixins: [
        CustomService
    ]
}
</script>

<style>
</style>
