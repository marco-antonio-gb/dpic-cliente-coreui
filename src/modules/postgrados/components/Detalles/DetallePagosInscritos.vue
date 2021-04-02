<template>
<div class="mb-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <goback />
 
        <CButton color="success" class="px-4" size="sm" :disabled="isDownload" @click="reportePagosPostgraduante($route.params.idPostgrado,$route.params.idPostgraduante,postgraduante_pago.postgraduante.full_name)">
            <CSpinner color="primary" size="sm" v-if="isDownload" class="mr-1" />
            <span v-if="isDownload">
                <CIcon name="cil-print"></CIcon> Descargando...
            </span>
            <span v-else>
                <CIcon name="cil-print"></CIcon> Reporte PDF
            </span>
        </CButton>
    </div>
    <loader :isLoading="isLoading" />
    <CCard class="p-3">
        <small class="text-muted">Postgraduante</small>
        <h5 class="w-75 font-weight-bold"> {{postgraduante_pago.postgraduante.full_name}} </h5>
        <CRow>
            <CCol col="12" sm="6">
                <small class="text-muted">Curso de postgrado</small><br>
                <strong class="h6">{{postgraduante_pago.postgrado}} / {{postgraduante_pago.postgrado_gestion}}</strong>
            </CCol>
        </CRow>
    </CCard>
    <CCard>
        <CCardBody class="p-2">
            <table class="table table-hover table-sm table-bordered">
                <thead>
                    <th>Item</th>
                    <th>Nro. Boleta</th>
                    <th>Costo [Bs.]</th>
                    <th>Fecha de cobro</th>
                    <th>Observacion</th>
                    <th>Opciones</th>
                </thead>
                <tbody>
                    <tr v-for="pago in postgraduante_pago.pagos" :key="pago.id">
                        <td><strong>{{pago.item}}</strong>
                            <span v-if="pago.observacion" class="text-dark"> <br> <small>Observacion: {{pago.observacion}}</small></span>
                        </td>
                        <td>{{pago.boleta}}</td>
                        <td>{{pago.costo_unitario | formatNumber}}</td>
                        <td>{{pago.fecha_cobro}}</td>
                        <td>{{pago.observacion}}</td>
                        <td>
                            <router-link class="custom-link" :to="{ name: 'editar-pagos-postgraduante', params: { idPostgrado: $route.params.idPostgrado, idPostgraduante:$route.params.idPostgraduante,idPago:pago.idPago}}" v-slot="{ href,navigate }" custom>
                                <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                    <CIcon name="cil-pencil"></CIcon> Editar
                                </a>
                            </router-link>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="text-right font-weight-bold">Total Pagado</td>
                        <td class="font-weight-bold  "> {{postgraduante_pago.total_pagado | formatNumber}}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2" class="text-right font-weight-bold">Total Deuda</td>
                        <td class="font-weight-bold   "> {{postgraduante_pago.total_deuda | formatNumber}}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr style="background:#f0f0f0">
                        <td colspan="2" class="text-right font-weight-bold">Total Curso</td>
                        <td class="font-weight-bold  "> {{postgraduante_pago.total_curso | formatNumber}}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </CCardBody>
    </CCard>
    <ToastProps :show_toast='show_toast' :color_toast='color_toast' :message_toast='message_toast' />
</div>
</template>

<script>
import ToastProps from '@/components/ShowToast'
import CustomService from '../../services/CustomService'
export default {
    name: 'postgrado-postgraduante',
    data() {
        return {
            selected: null,
            isLoading: true,
            isDownload: false,
            postgraduante_pago: {
                postgrado: '',
                postgraduante: {
                    full_name: ''
                },
                pagos: []
            },
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: '',
        }
    },
    created() {
        this.getPostgraduantePagos()
    },
    components: {
        ToastProps
    },
    mixins: [
        CustomService
    ],
    methods: {
        getPostgraduantePagos() {
            this.isLoading = true;
            this.show_toast = false
            axios
                .get("/verificar-pagos-postgrados-postgraduante/" + this.$route.params.idPostgrado + '/' + this.$route.params.idPostgraduante)
                .then(response => {
                    if (response.data.success) {
                        this.isLoading = false;
                        this.postgraduante_pago = response.data.data;
                    } else {
                        this.isLoading = false;
                        this.showToast(response.data.message, true, "danger");
                    }
                })
                .catch(error => {
                    this.isLoading = false;
                    if (error.response) {
                        this.showToast(
                            error.response.data.message,
                            true,
                            "danger"
                        );
                    } else if (error.request) {
                        this.showToast(error.request, true, "danger");
                    } else {
                        this.showToast(error.message, true, "danger");
                    }
                });
        },
        showToast(message, status, color) {
            if (typeof message === "string") {
                this.show_toast = status;
                this.message_toast = message;
                this.color_toast = color;
            } else {
                this.show_toast = status;
                this.message_toast = message.join("\n");
                this.color_toast = color;
            }
        },
    },
    computed: {
        total_pago() {
            return this.postgraduante_pago.pagos.reduce((acc, cur) => acc + Number(cur.costo_unitario), 0);
        }
    }
}
</script>

<style>
</style>
