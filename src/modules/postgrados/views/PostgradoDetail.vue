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
                    <span>Fecha Final: <strong>{{postgrado.fecha_final}}</strong> </span>
                </CCol>
            </CRow>
            <table class="table table-hover mt-3">
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
                        <th scope="row">{{index+1}}</th>
                        <td><strong> {{materia.sigla}} </strong></td>
                        <td>
                            <a href="javascript:void(0)" @click="$router.push({path:'/materias/detail/'+materia.idMateria})">{{materia.nombre}}</a>
                        </td>
                        <td>{{materia.credito}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="text-right">
                <h4 class="mr-5"><strong>Total horas:  </strong> {{total_creditos}}</h4>
            </div>
            <!-- <CListGroup>
                <p class="text-muted">Materias: </p>
                <CListGroupItem href="javascript:void(0)"  @click="$router.push({path:'/materias/detail/'+materia.idMateria})">
                    <div class="d-flex">
                        <div class=""></div>
                        <div class=""> </div>
                        <div class="mr-auto "></div>
                    </div>
                </CListGroupItem>
            </CListGroup> -->
        </CCardBody>
    </CCard>
    <!-- <pre>{{postgrado}}</pre> -->
</div>
</template>

<script>
import PostgradoService from '../services/PostgradoService'
import CustomService from '../services/CustomService'
export default {
    data() {
        return {
            total_creditos:0,
            postgrado: {
                nombre: '',
                fecha_inicio: '',
                fecha_final: '',
                cantidad_pagos: '',
                precio: '',
                gestion: '',
                nivel_id: '',
            }
        }
    },
    created() {
        this.PostgradoShow(this.$route.params.idPostgrado);
    },
    mixins: [
        PostgradoService,
        CustomService
    ],
    methods: {}
}
</script>
