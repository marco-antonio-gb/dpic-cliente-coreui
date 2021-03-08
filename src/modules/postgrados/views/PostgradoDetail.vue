<template>
<div>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <goback />
        <button class="btn btn-success" @click="$router.push({path:'/postgrados/update/'+$route.params.idPostgrado})"> Editar postgrado</button>
    </div>
    <CCard>
        <CCardBody>
            <div class="d-flex align-items-center">
            <div class="mr-auto ">
                <h4>{{postgrado.nombre}} <span class="font-weight-light">{{postgrado.gestion}}</span> </h4>
            </div>
            <div class="p-2"> <span class="mr-3"># Pagos: <strong>{{postgrado.cantidad_pagos}}</strong> </span></div>
            <div class="p-2"><span>Precio: <strong>{{postgrado.precio}} Bs.</strong></span></div>
        </div>
        <CRow>
            <CCol lg="5">
                <span class="mr-3">Fecha Inicio: <strong>{{postgrado.fecha_inicio}}</strong> </span>

            </CCol>
        </CRow>
        </CCardBody>
    </CCard>
    <!-- <CCard class="border-radius-top-0" v-if="postgrado.materias.length>0">
                <CCardBody class="p-0">
                    <table class="table table-hover  table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Sigla</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Credito</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(materia,index) in postgrado.materias" :key="materia.id">
                                <th>{{index+1}}</th>
                                <td><strong> {{materia.sigla}} </strong></td>
                                <td>
                                    <router-link class="custom-link mr-2" :to="{ name: 'materias-detail', params: { idMateria: materia.idMateria}}" v-slot="{ href,navigate }" custom>
                                        <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                            <CIcon name="cilLink" size="sm"></CIcon>
                                            {{materia.nombre}}
                                        </a>
                                    </router-link>
                                
                                </td>
                                <td>{{materia.credito}}</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-right"><strong>Total Horas </strong></td>
                                <td>{{total_creditos}}</td>
                            </tr>
                        </tbody>
                    </table>
                </CCardBody>
            </CCard>
            <CCard v-else class="border-radius-top-0">
                <CCardBody class="text-center">
                    <button class="btn btn-secondary " @click="$router.push({path:'/postgrados/asignar-materias/'+$route.params.idPostgrado})">Registrar Materias</button>
                </CCardBody>
            </CCard> -->
    <CTabs variant="tabs" :active-tab="0" class="mt-3">
        <CTab title="Materias/Modulos - Docentes">
            <CCard class="border-radius-top-0" v-if="postgrado.materias.length>0">
                <CCardBody class="p-0">
                    <table class="table table-hover  table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <!-- <th scope="col">Sigla</th> -->
                                <th scope="col">Nombre docente</th>
                                <th scope="col">Materia/Modulo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(docente,index) in docentes" :key="docente.id">
                                <th>{{index+1}}</th>
                           
                                <td>
                                    <router-link class="custom-link mr-2" :to="{ name: 'usuarios-detail', params: { idUsuario: docente.idUsuario}}" v-slot="{ href,navigate }" custom>
                                        <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                            <CIcon name="cilLink" size="sm"></CIcon>
                                            {{docente.full_name}}
                                        </a>
                                    </router-link>
                                    <br>
                                    <small>{{docente.profesion}}</small>
                                    <!-- <a href="javascript:void(0)" @click="$router.push({path:'/materias/detail/'+docente.idMateria})">{{docente.nombre}}</a> -->
                                </td>
                                <td>
                                    <router-link class="custom-link mr-2" :to="{ name: 'materias-detail', params: { idMateria: docente.idMateria}}" v-slot="{ href,navigate }" custom>
                                        <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                            <CIcon name="cilLink" size="sm"></CIcon>
                                            {{docente.sigla}} - {{docente.nombre}}
                                        </a>
                                    </router-link>
                                </td>
                            </tr>
                          
                        </tbody>
                    </table>
                </CCardBody>
            </CCard>
             <CCard v-else class="border-radius-top-0">
                <CCardBody class="text-center">
                    <button class="btn btn-secondary " @click="$router.push({path:'/postgrados/asignar-materias/'+$route.params.idPostgrado})">Registrar Materias</button>
                </CCardBody>
            </CCard>
        </CTab>
        <CTab title="Postgraduantes">
            <CCard class="border-radius-top-0" v-if="postgraduantes">
                <CCardBody class="p-0">
                    <table class="table table-hover  table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">CI</th>
                                <th scope="col">Celular</th>
                                <th scope="col">Profesion</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(postgraduante,index) in postgraduantes" :key="postgraduante.id">
                                <th scope="row">{{index+1}}</th>
                                <!-- <td><strong> {{postgraduante.full_name}} </strong></td> -->
                                <td>
                                    <router-link :to="`/postgraduantes/detail/${postgraduante.idPostgraduante}`" class="mr-2">
                                        {{postgraduante.full_name}}
                                    </router-link>
                                    <!-- <a href="javascript:void(0)" @click="$router.push({path:'/materias/detail/'+postgraduante.idMateria})">{{postgraduante.nombre}}</a> -->
                                </td>
                                <td>{{postgraduante.cedula}}</td>
                                <td>{{postgraduante.celular}}</td>
                                <td>{{postgraduante.profesion}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="text-right">
                        <!-- <h4 class="mr-5"><strong>Total horas: </strong> {{total_creditos}}</h4> -->
                    </div>
                </CCardBody>
            </CCard>
        </CTab>
        <CTab title="Pagos">
            Text will not be shown.
        </CTab>
         
        <CTab title="Calificaciones">
        </CTab>
    </CTabs>
    <!-- <pre>{{docentes}}</pre> -->
</div>
</template>

<script>
import PostgradoService from '../services/PostgradoService'
import CustomService from '../services/CustomService'
export default {
    data() {
        return {
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
            postgraduantes: [],
            docentes:[]
        }
    },
    created() {
        this.PostgradoShow(this.$route.params.idPostgrado);
        this.getPostgradoPostgraduantes(this.$route.params.idPostgrado);
        this.getPostgradoDocentes(this.$route.params.idPostgrado);
    },
    mixins: [
        PostgradoService,
        CustomService
    ],
    methods: {}
}
</script>

<style scoped>
.border-radius-top-0 {
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
}
</style>
