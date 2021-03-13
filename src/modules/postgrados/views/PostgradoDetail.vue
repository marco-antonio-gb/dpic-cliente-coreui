<template>
<div>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <goback />
        <CDropdown color="primary" toggler-text="Opciones">
            <CDropdownItem @click="$router.push({path:'/postgrados/inscribir-postgraduante-nuevo/'+$route.params.idPostgrado})">
                <CIcon name="cil-user-follow" class="mr-2"></CIcon> Postgraduante Nuevo
            </CDropdownItem>
            <CDropdownItem @click="$router.push({path:'/postgrados/inscribir-postgraduante-existente/'+$route.params.idPostgrado})">
                <CIcon name="cil-user" class="mr-2"></CIcon> Postgraduante Existente
            </CDropdownItem>
            <CDropdownItem @click="$router.push({path:'/postgrados/asignar-materias/'+$route.params.idPostgrado})">
                <CIcon name="cil-user" class="mr-2"></CIcon> Registrar Materias
            </CDropdownItem>
            <CDropdownDivider></CDropdownDivider>
            <!-- <CDropdownItem @click="$router.push({path:'/postgrados/registrar-pagos/'+$route.params.idPostgrado})">
                <CIcon name="cil-user" class="mr-2"></CIcon> Registrar Pagos
            </CDropdownItem> -->
            <CDropdownItem disabled>Disabled action</CDropdownItem>
        </CDropdown>
    </div>
    <CCard bodyWrapper>
        <CCallout color="primary">
            <p class="m-0 text-muted">Curso de postgrado</p>
            <h1 class="w-75">{{postgrado.nombre}}</h1>
        </CCallout>
        <CRow>
            <CCol col="12" sm="3">
                <small class="text-muted">Gestion</small><br>
                <strong class="h4">{{postgrado.gestion}}</strong>
            </CCol>
            <CCol col="12" sm="3">
                <small class="text-muted">Nro Pagos</small><br>
                <strong class="h4">{{postgrado.cantidad_pagos}}</strong>
            </CCol>
            <CCol col="12" sm="3">
                <small class="text-muted">Costo total</small><br>
                <strong class="h4">{{postgrado.precio | formatNumber}} Bs.</strong>
            </CCol>
            <CCol col="12" sm="3">
                <small class="text-muted">Fecha Inicio</small><br>
                <strong class="h4">{{postgrado.fecha_inicio}}</strong>
            </CCol>
        </CRow>
    </CCard>
    <CCard   v-if="postgrado.materias.length>0">
        <CCardHeader>
            <strong>Docentes / Asignaturas</strong>
          </CCardHeader>
        <CCardBody class="p-1">
            <table class="table table-hover table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre docente</th>
                        <th scope="col">Materia/Modulo</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(docente,index) in docentes" :key="docente.id">
                        <td><strong>{{index+1}}</strong></td>
                        <td>
                            <router-link class="custom-link mr-2" :to="{ name: 'usuarios-detail', params: { idUsuario: docente.idUsuario}}" v-slot="{ href,navigate }" custom>
                                <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                    <CIcon name="cilLink" size="sm" class="text-dark"></CIcon>
                                    {{docente.full_name}}
                                </a>
                            </router-link>
                            <!-- <br>
                            <small>{{docente.profesion}}</small> -->
                        </td>
                        <td>
                            <router-link class="custom-link mr-2" :to="{ name: 'materias-detail', params: { idMateria: docente.idMateria}}" v-slot="{ href,navigate }" custom>
                                <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                    <CIcon name="cilLink" size="sm" class="text-dark icon-link"></CIcon>
                                    {{docente.sigla}} - {{docente.nombre}}
                                </a>
                            </router-link>
                        </td>
                        <td>
                            <CButtonGroup>
                                <CButton color="light" size="sm" @click="$router.push({path:'/postgrados/detail/'+postgraduante.idPostgrado})">
                                    <CIcon name="cil-user"></CIcon>
                                </CButton>
                                <CButton color="secondary" size="sm" @click="$router.push({path:'/postgrados/update/'+postgraduante.idPostgrado})">
                                    <CIcon name="cil-pencil"></CIcon>
                                </CButton>
                                <CButton color="dark" size="sm" @click="handleClick(itpostgraduanteem.idPostgrado)">
                                    <CIcon name="cil-trash"></CIcon>
                                </CButton>
                            </CButtonGroup>
                        </td>
                    </tr>
                </tbody>
            </table>
        </CCardBody>
    </CCard>
    <CCard v-else  >
        <CCardBody class="text-center">
           <span>No se registraron materias</span>
        </CCardBody>
    </CCard>
    <!-- <CCard>
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
    </CCard> -->
    <CCard class="border-radius-top-0" v-if="pagos.length>0">
         <CCardHeader>
            <strong>Pagos</strong>
          </CCardHeader>
                <CCardBody class="p-0">
                    <table class="table table-hover  table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Postgraduante</th>
                                <th scope="col">CI</th>
                                <!-- <th scope="col">Postgrado</th> -->
                                <th scope="col">Boleta</th>
                                <th scope="col">Concepto</th>
                                <th scope="col">Monto</th>
                                <th scope="col">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(materia,index) in pagos" :key="materia.id">
                                <th>{{index+1}}</th>
                                <td><strong> {{materia.full_name}} </strong></td>
                                <td><strong> {{materia.ci}} </strong></td>
                                <!-- <td>
                                    <router-link class="custom-link mr-2" :to="{ name: 'materias-detail', params: { idPago: materia.idPago}}" v-slot="{ href,navigate }" custom>
                                        <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                            <CIcon name="cilLink" size="sm"></CIcon>
                                            {{materia.nombre}}
                                        </a>
                                    </router-link>
                                </td> -->
                                <td>{{materia.boleta}}</td>
                                <td>{{materia.item}}</td>
                                <td>{{materia.costo_unitario}}</td>
                                <td>{{materia.fecha_cobro}}</td>
                            </tr>
                            <!-- <tr>
                                <td colspan="3" class="text-right"><strong>Total Horas </strong></td>
                                <td>{{total_creditos}}</td>
                            </tr> -->
                        </tbody>
                    </table>
                </CCardBody>
            </CCard>
            <CCard v-else class="border-radius-top-0">
                <CCardBody class="text-center">
                    <button class="btn btn-secondary " @click="$router.push({path:'/postgrados/asignar-materias/'+$route.params.idPostgrado})">Registrar Materias</button>
                </CCardBody>
            </CCard>
<CCard  v-if="postgraduantes.length>0">
     <CCardHeader>
            <strong>Postgraduantes</strong>
          </CCardHeader>
        <CCardBody class="p-1">
            <table class="table table-hover  table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">CI</th>
                        <th scope="col">Celular</th>
                        <th scope="col">Profesion</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(postgraduante,index) in postgraduantes" :key="postgraduante.id">
                        <td><strong>{{index+1}}</strong></td>
                        <td>
                            <router-link class="custom-link mr-2" :to="{ name: 'postgraduantes-detail', params: { idPostgraduante: postgraduante.idPostgraduante}}" v-slot="{ href,navigate }" custom>
                                <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                    <CIcon name="cilLink" size="sm" class="text-dark"></CIcon>
                                    {{postgraduante.full_name}}
                                </a>
                            </router-link>
                            <!-- <router-link :to="`/postgraduantes/detail/${postgraduante.idPostgraduante}`" class="mr-2">
                                {{postgraduante.full_name}}
                            </router-link> -->
                        </td>
                        <td>{{postgraduante.cedula}}</td>
                        <td>{{postgraduante.celular}}</td>
                        <td>{{postgraduante.profesion}}</td>
                        <td class=" ">
                            <CButtonGroup> 
                                <CButton color="light" size="sm" @click="$router.push({path:'/postgrados/registrar-pago/'+$route.params.idPostgrado+'/postgraduante/'+postgraduante.idPostgraduante})">
                                    <CIcon name="cil-dollar"></CIcon>
                                </CButton>
                                <CButton color="secondary" size="sm" @click="reportePagosPostgraduante($route.params.idPostgrado,postgraduante.idPostgraduante,postgraduante.full_name+'-'+postgrado.nombre)">
                                    <CIcon name="cil-pencil"></CIcon>
                                </CButton>
                                <CButton color="dark" size="sm" @click="handleClick(itpostgraduanteem.idPostgrado)">
                                    <CIcon name="cil-trash"></CIcon>
                                </CButton>
                            </CButtonGroup>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="text-right">
            </div>
        </CCardBody>
    </CCard>
     <CCard v-else  >
        <CCardBody class="text-center">
           <span>No se registraron postgraduantes</span>
        </CCardBody>
    </CCard>
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
            docentes: [],
            pagos: []
        }
    },
    created() {
        this.PostgradoShow(this.$route.params.idPostgrado);
        this.getPostgradoPostgraduantes(this.$route.params.idPostgrado);
        this.getPostgradoDocentes(this.$route.params.idPostgrado);
        this.getPagos(this.$route.params.idPostgrado);
    },
    mixins: [
        PostgradoService,
        CustomService
    ],
    methods: {
        console() {
            console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
        },
        getPagos(id) {
            axios
                .get("/pagos-postgrados/" + id)
                .then(response => {
                    if (response.status === 200 && response.data.data) {
                        // this.isLoading = false;/
                        this.pagos = response.data.data;
                        // this.total = response.data.total;
                    } else {
                        // this.isLoading = false;
                        this.showToast(response.data.message, true, "");
                    }
                })
                .catch(error => {
                    this.isLoading = false;
                    if (error.response) {
                        this.showToast(
                            "SERVER: " + error.response.data.message,
                            true,
                            "danger"
                        );
                    } else if (error.request) {
                        this.showToast(
                            "SERVER: " + error.request,
                            true,
                            "danger"
                        );
                    } else {
                        this.showToast(
                            "SERVER: " + error.message,
                            true,
                            "danger"
                        );
                    }
                });
        },
    }
}
</script>
<style scoped>
.border-radius-top-0 {
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
}
</style>
