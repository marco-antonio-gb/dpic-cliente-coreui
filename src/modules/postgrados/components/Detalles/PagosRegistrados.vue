<template>
<div>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <goback />
        <CButton color="success" class="px-4" size="sm" :disabled="isDownload" @click="reportePagosPostgrado($route.params.idPostgrado,pagos.postgrado)">
            <CSpinner color="primary" size="sm" v-if="isDownload" class="mr-1" />
            <span v-if="isDownload">
                <CIcon name="cil-print"></CIcon> Descargando...
            </span>
            <span v-else>
                <CIcon name="cil-print"></CIcon> Reporte PDF
            </span>
        </CButton>
    </div>
    <CCard class="p-3">
        <CRow>
            <CCol col="12" sm="6">
                <small class="text-muted">Curso de postgrado</small><br>
                <strong class="h6">{{pagos.postgrado}} </strong>
            </CCol>
        </CRow>
    </CCard>
    <CCard class="border-radius-top-0" v-if="pagos">
        <CCardHeader>
            <strong>Pagos</strong>
        </CCardHeader>
        <CCardBody class="p-0">
            <table class="table    table-sm">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">#</th>
                        <th scope="col">Postgraduante</th>
                        <th scope="col" class="text-center">#pagos</th>
                        <!-- <th scope="col">Postgrado</th> -->
                        <th scope="col">Boleta</th>
                        <th scope="col">Detalle</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(pago,index) in pagos.pagos_postgrado" :key="pago.id">
                        <td class="text-center">{{index+1}}</td>
                        <td>{{pago.postgraduante}} </td>
                        <td class="text-center">{{pago.size}}</td>
                        <td>{{pago.total_pagos}}</td>
                        <td>
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Boleta</th>
                                        <th>Monto</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tr v-for="cuota in pago.pagos" :key="cuota.id">
                                    <td>{{cuota.item}}</td>
                                    <td>{{cuota.boleta}}</td>
                                    <td>{{cuota.costo_unitario}}</td>
                                    <td>{{cuota.fecha_cobro}}</td>
                                </tr>
                            </table>
                        </td>
                        <td class="text-center">
                            <CButton color="secondary" @click="reportePagosPostgraduante($route.params.idPostgrado,pago.idPostgraduante,pago.postgraduante+'-'+pagos.postgrado)">
                                <CIcon name="cil-print"></CIcon>
                            </CButton>
                        </td>
                    </tr>
                  
                </tbody>
            </table>
        </CCardBody>
    </CCard>
    <CCard v-else>
        <CCardBody class="text-center">
            <span>No se registraron Pagos</span>
        </CCardBody>
    </CCard>
</div>
</template>

<script>
import CustomService from '../../services/CustomService'
export default {
    data() {
        return {
            pagos: {},
            isDownload: false,
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: ''
        }
    },
    created() {
        this.getPagosPostgrado(this.$route.params.idPostgrado);
    },
    mixins: [
        CustomService
    ]
}
</script>

<style>
</style>
