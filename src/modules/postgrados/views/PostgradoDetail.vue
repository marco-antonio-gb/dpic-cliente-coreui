<template>
<div class="mb-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <goback />
        <CDropdown color="primary" toggler-text="Opciones">
            <CDropdownItem @click="$router.push({path:'/postgrados/detail/'+$route.params.idPostgrado+'/registrar-postgraduante/nuevo'})">
                <CIcon name="cil-user-follow" class="mr-2"></CIcon> Postgraduante Nuevo
            </CDropdownItem>
            <CDropdownItem @click="$router.push({path:'/postgrados/detail/'+$route.params.idPostgrado+'/registrar-postgraduante/existente'})">
                <CIcon name="cil-user" class="mr-2"></CIcon> Postgraduante Existente
            </CDropdownItem>
            <CDropdownItem @click="$router.push({path:'/postgrados/detail/'+$route.params.idPostgrado+'/registrar-materia'})">
                <CIcon name="cil-user" class="mr-2"></CIcon> Materia Nueva
            </CDropdownItem>
            <!-- postgrados/detalle-pagos/:idPostgrado/postgraduante/:idPostgraduante -->
            <CDropdownItem @click="$router.push({path:'/postgrados/detail/'+$route.params.idPostgrado+'/pagos'})">
                <CIcon name="cil-user" class="mr-2"></CIcon> Detalle pagos
            </CDropdownItem>
            <CDropdownDivider></CDropdownDivider>
            <CDropdownItem @click="reportePagosPostgrado($route.params.idPostgrado, postgrado.nombre)">
                <CIcon name="cil-print" class="mr-2"></CIcon>Reporte de Pagos General
            </CDropdownItem>
            <!-- <CDropdownItem @click="$router.push({path:'/postgrados/detail/'+$route.params.idPostgrado+'/postgraduantes'})">
                <CIcon name="cil-print" class="mr-2"></CIcon>Postgraduantes Inscritos
            </CDropdownItem> -->
            <CDropdownItem @click="$router.push({path:'/postgrados/detail/'+$route.params.idPostgrado+'/materias'})">
                <CIcon name="cil-print" class="mr-2"></CIcon>Materias Registradas
            </CDropdownItem>

        </CDropdown>
    </div>

    <PostgradoHeader :postgrado="postgrado" />
    <loader :isLoading="isLoading" />
            <DetallePostgraduantes :inscritos="inscritos.postgraduantes"/>

     
</div>
</template>

<script>
import PostgradoService from '../services/PostgradoService'
import CustomService from '../services/CustomService'
 
import DetallePostgraduantes from '../components/Detalles/PostgraduantesInscritos'
import PostgradoHeader from '../components/Detalles/PostgradoHeader'
import Loader from '../../../components/Loader.vue'
export default {
    data() {
        return {
            isLoading:false,
            total_creditos: 0,
            postgrado: {
                nombre: '',
                fecha_inicio: '',
                cantidad_pagos: '',
                precio: '',
                gestion: '',
                nivel_id: '',
                materias: []
            },
            inscritos: {
                postgraduantes:[]
            },
            docentes: [],
            pagos: []
        }
    },
    mounted() {
        this.PostgradoShow(this.$route.params.idPostgrado);
        this.getPostgraduantesInscritos(this.$route.params.idPostgrado);
        // this.getMateriasRegistradas(this.$route.params.idPostgrado);
        // this.`getPagos`(this.$route.params.idPostgrado);
    },
    mixins: [
        PostgradoService,
        CustomService
    ],
    components: {
    
        DetallePostgraduantes,
        PostgradoHeader,
        Loader
    },
   
}
</script>
