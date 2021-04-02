<template>
<div>
    <CCard v-if="postgraduantes">
        <CCardBody  >
            <table class="table table-hover  table-sm m-0">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">CI</th>
                        <th scope="col">Celular</th>
                        <!-- <th scope="col">Profesion</th> -->
                        <th scope="col" class="text-right">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="postgraduante in postgraduantes.postgraduantes" :key="postgraduante.id">
                        <td>
                            <router-link class="custom-link mr-2" :to="{ name: 'postgraduantes-detail', params: { idPostgraduante: postgraduante.idPostgraduante}}" v-slot="{ href,navigate }" custom>
                                <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                    {{postgraduante.full_name}}
                                </a>
                            </router-link>
                         
                        </td>
                        <td>{{postgraduante.cedula}}</td>
                        <td>{{postgraduante.celular}}</td>
                        <!-- <td>{{postgraduante.profesion}}</td> -->
                        <td class="text-right">
                            <CButtonGroup>
                                <CButton color="light" size="sm" @click="$router.push({path:'/postgrados/detalle-pagos/'+$route.params.idPostgrado+'/postgraduante/'+postgraduante.idPostgraduante})">
                                    <CIcon name="cil-dollar"></CIcon> Pagos
                                </CButton>
                                <CButton color="secondary" size="sm" @click="reporteCalificacionesPostgraduante($route.params.idPostgrado,postgraduante.idPostgraduante,postgraduante.full_name+'-'+postgrado_name)">
                                    <CIcon name="cil-print"></CIcon> Notas
                                </CButton>
                                <CButton color="dark" size="sm" @click="reporteCalificacionesPostgraduante($route.params.idPostgrado,postgraduante.idPostgraduante,postgraduante.full_name+'-'+postgrado_name)">
                                    <CIcon name="cil-dollar"></CIcon> Registrar Pago
                                </CButton>
                            </CButtonGroup>
                        </td>
                    </tr>
                </tbody>
            </table>
            
        </CCardBody>
    </CCard>
    <CCard v-else>
        <CCardBody class="text-center">
        <pre>{{postgraduantes}}</pre>
            <span>No se registraron postgraduantes</span>
        </CCardBody>
    </CCard>
</div>
</template>
<script>
import CustomService from '../../services/CustomService'
export default {
    props: {
        postgraduantes: {
            type: Object,
            default: ''
        },
        postgrado_name:{
            type:String,
            default:''
        }
    },
    mixins:[
        CustomService
    ]
}
</script>
<style>
</style>
