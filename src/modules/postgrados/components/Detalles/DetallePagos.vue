<template>
<CCard class="border-radius-top-0" v-if="pagos.length>0">
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
                <tr v-for="(pago,index) in pagos" :key="pago.id">
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
                        <CButton color="secondary" @click="reportePagosPostgraduante($route.params.idPostgrado,pago.idPostgraduante,pago.postgraduante+'-'+postgrado_name)">
                            <CIcon name="cil-print"></CIcon>
                        </CButton>
                    </td>
                </tr>
                <!-- <tr>
                                <td colspan="3" class="text-right"><strong>Total Horas </strong></td>
                                <td>{{total_creditos}}</td>
                            </tr> -->
            </tbody>
        </table>
    </CCardBody>
</CCard>
<CCard v-else>
    <CCardBody class="text-center">
        <span>No se registraron Pagos</span>
    </CCardBody>
</CCard>
</template>

<script>
import CustomService from '../../services/CustomService'
export default {
    props: {
        pagos: {
            type: Array,
            default: []
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
